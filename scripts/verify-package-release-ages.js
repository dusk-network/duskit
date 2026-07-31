/* eslint-disable complexity, max-depth, max-statements, no-console */
import fs from "node:fs/promises";
import { pathToFileURL } from "node:url";

const DAY_MS = 24 * 60 * 60 * 1000;
const REGISTRY_ORIGIN = "https://registry.npmjs.org";
const DEFAULT_CONCURRENCY = 16;

const parseArguments = (args) => {
  const options = {
    concurrency: DEFAULT_CONCURRENCY,
    days: undefined,
    exceptions: ".npm-release-age-exceptions.json",
    lockfile: "package-lock.json",
  };

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    const value = args[index + 1];

    if (argument === "--days") {
      options.days = Number(value);
    } else if (argument === "--exceptions") {
      options.exceptions = value;
    } else if (argument === "--lockfile") {
      options.lockfile = value;
    } else if (argument === "--concurrency") {
      options.concurrency = Number(value);
    } else {
      throw new Error(`Unknown argument: ${argument}`);
    }

    if (value === undefined) {
      throw new Error(`Missing value for ${argument}`);
    }

    index += 1;
  }

  if (!Number.isFinite(options.days) || options.days <= 0) {
    throw new Error("--days must be a positive number");
  }

  if (!Number.isInteger(options.concurrency) || options.concurrency <= 0) {
    throw new Error("--concurrency must be a positive integer");
  }

  return options;
};

const packageNameFromPath = (packagePath) => {
  const marker = "node_modules/";
  const markerIndex = packagePath.lastIndexOf(marker);

  if (markerIndex === -1) {
    throw new Error(
      `Cannot derive a package name from lockfile path: ${packagePath}`
    );
  }

  const pathParts = packagePath.slice(markerIndex + marker.length).split("/");
  return pathParts[0].startsWith("@")
    ? pathParts.slice(0, 2).join("/")
    : pathParts[0];
};

const parseRegistryTarballUrl = (resolved, packagePath) => {
  let url;

  try {
    url = new URL(resolved);
  } catch {
    throw new Error(
      `Unsupported resolved source for ${packagePath}: ${resolved}`
    );
  }

  if (url.origin !== REGISTRY_ORIGIN) {
    throw new Error(`Non-registry dependency in ${packagePath}: ${resolved}`);
  }

  if (url.username || url.password || url.search || url.hash) {
    throw new Error(
      `Unsupported registry tarball URL in ${packagePath}: ${resolved}`
    );
  }

  const separator = "/-/";
  const separatorIndex = url.pathname.indexOf(separator);

  if (
    separatorIndex <= 1 ||
    separatorIndex !== url.pathname.lastIndexOf(separator)
  ) {
    throw new Error(
      `Invalid registry tarball URL in ${packagePath}: ${resolved}`
    );
  }

  let name;

  try {
    name = decodeURIComponent(url.pathname.slice(1, separatorIndex));
  } catch {
    throw new Error(
      `Invalid package name in registry tarball URL for ${packagePath}: ${resolved}`
    );
  }

  return { name, url: url.href };
};

const normalizeIntegrity = (integrity, context) => {
  if (typeof integrity !== "string" || integrity.trim() === "") {
    throw new Error(`Missing registry integrity for ${context}`);
  }

  const normalized = integrity
    .trim()
    .split(/\s+/)
    .map((token) => {
      const match = /^([a-z0-9]+)-([A-Za-z0-9+/]+={0,2})$/.exec(token);

      if (!match) {
        throw new Error(`Invalid registry integrity for ${context}: ${token}`);
      }

      const digest = Buffer.from(match[2], "base64");

      if (digest.length === 0) {
        throw new Error(`Invalid registry integrity for ${context}: ${token}`);
      }

      return `${match[1]}-${digest.toString("base64")}`;
    });

  return [...new Set(normalized)].sort().join(" ");
};

export const collectRegistryPackages = (lockfile) => {
  if (!lockfile.packages || typeof lockfile.packages !== "object") {
    throw new Error("Lockfile does not contain a packages map");
  }

  const workspaceList = lockfile.packages[""]?.workspaces;

  if (!Array.isArray(workspaceList)) {
    throw new Error("Root lockfile entry does not contain a workspaces array");
  }

  const packages = new Map();
  const workspaces = new Set(workspaceList);
  let entryCount = 0;

  for (const workspace of workspaces) {
    if (typeof workspace !== "string" || !lockfile.packages[workspace]) {
      throw new Error(
        `Invalid or missing workspace lockfile entry: ${workspace}`
      );
    }
  }

  for (const [packagePath, entry] of Object.entries(lockfile.packages)) {
    if (packagePath === "") {
      continue;
    }

    if (entry.link) {
      if (!workspaces.has(entry.resolved)) {
        throw new Error(
          `Undeclared directory dependency in ${packagePath}: ${entry.resolved}`
        );
      }

      continue;
    }

    if (!packagePath.includes("node_modules/")) {
      if (!workspaces.has(packagePath)) {
        throw new Error(`Unexpected local lockfile entry: ${packagePath}`);
      }

      continue;
    }

    if (!entry.version || typeof entry.version !== "string") {
      throw new Error(`Lockfile entry has no exact version: ${packagePath}`);
    }

    const name = packageNameFromPath(packagePath);

    if (!entry.resolved || typeof entry.resolved !== "string") {
      throw new Error(`Lockfile entry has no resolved tarball: ${packagePath}`);
    }

    const resolved = parseRegistryTarballUrl(entry.resolved, packagePath);

    if (resolved.name !== name) {
      if (entry.name === resolved.name) {
        throw new Error(
          `Unsupported npm alias in ${packagePath}: ${name} -> ${resolved.name}`
        );
      }

      throw new Error(
        `Package name mismatch in ${packagePath}: expected ${name}, resolved ${resolved.name}`
      );
    }

    if (!packages.has(name)) {
      packages.set(name, []);
    }

    packages.get(name).push({
      integrity: normalizeIntegrity(entry.integrity, packagePath),
      name,
      packagePath,
      resolved: resolved.url,
      version: entry.version,
    });
    entryCount += 1;
  }

  return { entryCount, packages };
};

const exceptionKey = (name, version) => JSON.stringify([name, version]);

const readExceptions = async (file, now) => {
  const document = JSON.parse(await fs.readFile(file, "utf8"));

  if (!Array.isArray(document.exceptions)) {
    throw new Error(`${file} must contain an exceptions array`);
  }

  const exceptions = new Map();

  for (const exception of document.exceptions) {
    const { package: name, version, reason, expires } = exception;
    const expiresAt = Date.parse(expires);

    if (
      typeof name !== "string" ||
      typeof version !== "string" ||
      typeof reason !== "string" ||
      reason.trim() === "" ||
      !Number.isFinite(expiresAt)
    ) {
      throw new Error(
        `Invalid release-age exception; expected package, version, reason, and expires: ${JSON.stringify(exception)}`
      );
    }

    if (expiresAt <= now) {
      throw new Error(`Expired release-age exception: ${name}@${version}`);
    }

    const key = exceptionKey(name, version);

    if (exceptions.has(key)) {
      throw new Error(`Duplicate release-age exception: ${name}@${version}`);
    }

    exceptions.set(key, exception);
  }

  return exceptions;
};

const wait = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const fetchPackageMetadata = async (name) => {
  const url = `${REGISTRY_ORIGIN}/${encodeURIComponent(name)}`;
  let lastError;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          accept: "application/json",
          "user-agent": "dusk-lockfile-release-age-check/1",
        },
        signal: AbortSignal.timeout(30_000),
      });

      if (response.ok) {
        return await response.json();
      }

      const error = new Error(
        `Registry returned HTTP ${response.status} for ${name}`
      );

      if (response.status !== 429 && response.status < 500) {
        throw error;
      }

      lastError = error;
    } catch (error) {
      lastError = error;
    }

    await wait(250 * 2 ** attempt);
  }

  throw lastError;
};

export const verifyReleaseAges = async ({
  concurrency,
  cutoff,
  exceptions,
  fetchMetadata = fetchPackageMetadata,
  packages,
  now,
}) => {
  const queue = [...packages.entries()];
  const failures = [];
  const usedExceptions = new Set();
  let queueIndex = 0;

  const worker = async () => {
    while (queueIndex < queue.length) {
      const [name, entries] = queue[queueIndex];
      queueIndex += 1;

      let metadata;

      try {
        metadata = await fetchMetadata(name);
      } catch (error) {
        failures.push(`${name}: ${error.message}`);
        continue;
      }

      for (const entry of entries) {
        const { packagePath, version } = entry;
        const versionMetadata = metadata.versions?.[version];

        if (!versionMetadata || typeof versionMetadata !== "object") {
          failures.push(
            `${name}@${version} (${packagePath}): registry version metadata is unavailable`
          );
          continue;
        }

        let registryTarball;
        let registryIntegrity;

        try {
          registryTarball = parseRegistryTarballUrl(
            versionMetadata.dist?.tarball,
            `${name}@${version}`
          );
          registryIntegrity = normalizeIntegrity(
            versionMetadata.dist?.integrity,
            `${name}@${version}`
          );
        } catch (error) {
          failures.push(error.message);
          continue;
        }

        if (registryTarball.name !== name) {
          failures.push(
            `${name}@${version} (${packagePath}): registry tarball names ${registryTarball.name}`
          );
        }

        if (entry.resolved !== registryTarball.url) {
          failures.push(
            `${name}@${version} (${packagePath}): resolved tarball does not match registry metadata`
          );
        }

        if (entry.integrity !== registryIntegrity) {
          failures.push(
            `${name}@${version} (${packagePath}): integrity does not match registry metadata`
          );
        }

        const published = metadata.time?.[version];
        const publishedAt = Date.parse(published);

        if (!published || !Number.isFinite(publishedAt)) {
          failures.push(
            `${name}@${version}: registry publication timestamp is unavailable`
          );
          continue;
        }

        if (publishedAt >= cutoff) {
          const key = exceptionKey(name, version);

          if (exceptions.has(key)) {
            usedExceptions.add(key);
            continue;
          }

          const age = ((now - publishedAt) / DAY_MS).toFixed(2);
          failures.push(
            `${name}@${version}: published ${published} (${age} days old)`
          );
        }
      }
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(concurrency, queue.length) }, () => worker())
  );

  for (const [key, exception] of exceptions) {
    if (!usedExceptions.has(key)) {
      failures.push(
        `${exception.package}@${exception.version}: exception is unused and must be removed`
      );
    }
  }

  return failures;
};

const main = async () => {
  const options = parseArguments(process.argv.slice(2));
  const now = Date.now();
  const cutoff = now - options.days * DAY_MS;
  const lockfile = JSON.parse(await fs.readFile(options.lockfile, "utf8"));
  const exceptions = await readExceptions(options.exceptions, now);
  const { entryCount, packages } = collectRegistryPackages(lockfile);
  const failures = await verifyReleaseAges({
    concurrency: options.concurrency,
    cutoff,
    exceptions,
    now,
    packages,
  });

  if (failures.length > 0) {
    throw new Error(
      `Package release-age verification failed (minimum ${options.days} days):\n- ${failures
        .sort()
        .join("\n- ")}`
    );
  }

  console.log(
    `Verified ${entryCount} lockfile entries across ${packages.size} registry packages are at least ${options.days} days old.`
  );
};

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
