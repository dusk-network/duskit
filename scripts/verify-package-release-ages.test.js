import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, test } from "node:test";

import {
  collectRegistryPackages,
  readAuthoritativeWorkspaces,
  verifyReleaseAges,
} from "./verify-package-release-ages.js";

const OLD_DATE = "2020-01-01T00:00:00.000Z";
const NOW = Date.parse("2026-07-31T00:00:00.000Z");
const INTEGRITY_1 = `sha512-${Buffer.from("artifact-one").toString("base64")}`;
const INTEGRITY_2 = `sha512-${Buffer.from("artifact-two").toString("base64")}`;
const WORKSPACE_NAME = "@duskit/example-workspace";
const WORKSPACE_PATH = "packages/example-workspace";
const WORKSPACE_VERSION = "1.0.0";
const WORKSPACES = new Map([
  [
    WORKSPACE_PATH,
    {
      name: WORKSPACE_NAME,
      version: WORKSPACE_VERSION,
    },
  ],
]);

const tarball = (name, version) =>
  `https://registry.npmjs.org/${name}/-/${name}-${version}.tgz`;

const makeLockfile = ({
  integrity = INTEGRITY_1,
  name,
  packagePath = "node_modules/example",
  resolved = tarball("example", "1.0.0"),
  version = "1.0.0",
} = {}) => ({
  lockfileVersion: 3,
  packages: {
    "": {
      workspaces: [WORKSPACE_PATH],
    },
    [packagePath]: {
      ...(name ? { name } : {}),
      integrity,
      resolved,
      version,
    },
    [WORKSPACE_PATH]: {
      name: WORKSPACE_NAME,
      version: WORKSPACE_VERSION,
    },
  },
});

const makeMetadata = ({
  integrity = INTEGRITY_1,
  name = "example",
  resolved = tarball("example", "1.0.0"),
  version = "1.0.0",
} = {}) => ({
  time: {
    [version]: OLD_DATE,
  },
  versions: {
    [version]: {
      dist: {
        integrity,
        tarball: resolved,
      },
      name,
      version,
    },
  },
});

const verify = async (lockfile, metadata) => {
  const { packages } = collectRegistryPackages(lockfile, WORKSPACES);

  return verifyReleaseAges({
    concurrency: 1,
    cutoff: NOW - 7 * 24 * 60 * 60 * 1000,
    exceptions: new Map(),
    fetchMetadata: async () => metadata,
    now: NOW,
    packages,
  });
};

const writeJson = (file, value) =>
  fs.writeFile(file, `${JSON.stringify(value, null, 2)}\n`);

const createRepository = async ({
  name = WORKSPACE_NAME,
  version = WORKSPACE_VERSION,
  workspacePath = WORKSPACE_PATH,
} = {}) => {
  const root = await fs.mkdtemp(
    path.join(os.tmpdir(), "duskit-release-age-test-")
  );
  const workspaceDirectory = path.join(root, ...workspacePath.split("/"));

  await fs.mkdir(workspaceDirectory, { recursive: true });
  await writeJson(path.join(root, "package.json"), {
    private: true,
    workspaces: [workspacePath],
  });
  await writeJson(path.join(workspaceDirectory, "package.json"), {
    name,
    version,
  });

  return root;
};

const makeWorkspaceLockfile = ({
  linkName = WORKSPACE_NAME,
  lockfileWorkspaces = [WORKSPACE_PATH],
  resolved = WORKSPACE_PATH,
  workspaceName = WORKSPACE_NAME,
  workspaceVersion = WORKSPACE_VERSION,
} = {}) => ({
  lockfileVersion: 3,
  packages: {
    "": {
      workspaces: lockfileWorkspaces,
    },
    [`node_modules/${linkName}`]: {
      link: true,
      resolved,
    },
    [WORKSPACE_PATH]: {
      name: workspaceName,
      version: workspaceVersion,
    },
  },
});

describe("release-age artifact binding", () => {
  test("accepts a canonical registry entry", async () => {
    assert.deepEqual(await verify(makeLockfile(), makeMetadata()), []);
  });

  test("rejects an old version that resolves to a newer tarball", async () => {
    const failures = await verify(
      makeLockfile({
        integrity: INTEGRITY_2,
        resolved: tarball("example", "2.0.0"),
      }),
      makeMetadata()
    );

    assert(failures.some((failure) => failure.includes("resolved tarball")));
    assert(failures.some((failure) => failure.includes("integrity")));
  });

  test("rejects a package path that resolves to another package", () => {
    assert.throws(
      () =>
        collectRegistryPackages(
          makeLockfile({
            packagePath: "node_modules/foo",
            resolved: tarball("bar", "1.0.0"),
          }),
          WORKSPACES
        ),
      /Package name mismatch.*expected foo, resolved bar/
    );
  });

  test("rejects a modified lockfile integrity", async () => {
    const failures = await verify(
      makeLockfile({ integrity: INTEGRITY_2 }),
      makeMetadata()
    );

    assert(failures.some((failure) => failure.includes("integrity")));
  });

  test("rejects npm aliases until they are explicitly supported", () => {
    assert.throws(
      () =>
        collectRegistryPackages(
          makeLockfile({
            name: "bar",
            packagePath: "node_modules/foo",
            resolved: tarball("bar", "1.0.0"),
          }),
          WORKSPACES
        ),
      /Unsupported npm alias.*foo -> bar/
    );
  });
});

describe("authoritative workspace links", () => {
  test("accepts a declared in-repository workspace link", async () => {
    const root = await createRepository();

    try {
      const workspaces = await readAuthoritativeWorkspaces(
        path.join(root, "package.json")
      );
      const result = collectRegistryPackages(
        makeWorkspaceLockfile(),
        workspaces
      );

      assert.equal(result.entryCount, 0);
      assert.equal(result.packages.size, 0);
    } finally {
      await fs.rm(root, { force: true, recursive: true });
    }
  });

  test("rejects a workspace declared only by the lockfile", async () => {
    const root = await createRepository();

    try {
      const workspaces = await readAuthoritativeWorkspaces(
        path.join(root, "package.json")
      );

      assert.throws(
        () =>
          collectRegistryPackages(
            makeWorkspaceLockfile({
              lockfileWorkspaces: [WORKSPACE_PATH, "vendor/turbo"],
            }),
            workspaces
          ),
        /workspace list does not match package\.json/
      );
    } finally {
      await fs.rm(root, { force: true, recursive: true });
    }
  });

  test("rejects an undeclared in-repository link target", async () => {
    const root = await createRepository();

    try {
      const workspaces = await readAuthoritativeWorkspaces(
        path.join(root, "package.json")
      );
      const lockfile = makeWorkspaceLockfile();

      lockfile.packages["node_modules/turbo"] = {
        link: true,
        resolved: "vendor/turbo",
      };
      lockfile.packages["vendor/turbo"] = {
        name: "turbo",
        version: "2.10.0",
      };

      assert.throws(
        () => collectRegistryPackages(lockfile, workspaces),
        /Undeclared directory dependency.*vendor\/turbo/
      );
    } finally {
      await fs.rm(root, { force: true, recursive: true });
    }
  });

  test("rejects a link target that escapes the repository", async () => {
    const root = await createRepository();

    try {
      const workspaces = await readAuthoritativeWorkspaces(
        path.join(root, "package.json")
      );
      const lockfile = makeWorkspaceLockfile();

      lockfile.packages["node_modules/turbo"] = {
        link: true,
        resolved: "../../outside",
      };

      assert.throws(
        () => collectRegistryPackages(lockfile, workspaces),
        /Invalid workspace path.*\.\.\/\.\.\/outside/
      );
    } finally {
      await fs.rm(root, { force: true, recursive: true });
    }
  });

  test("rejects workspace package metadata mismatches", async () => {
    const root = await createRepository();

    try {
      const workspaces = await readAuthoritativeWorkspaces(
        path.join(root, "package.json")
      );

      assert.throws(
        () =>
          collectRegistryPackages(
            makeWorkspaceLockfile({
              workspaceName: "@duskit/substituted",
            }),
            workspaces
          ),
        /Workspace lockfile entry does not match package\.json/
      );
    } finally {
      await fs.rm(root, { force: true, recursive: true });
    }
  });

  test("rejects a workspace symlink that escapes the repository", async () => {
    const parent = await fs.mkdtemp(
      path.join(os.tmpdir(), "duskit-release-age-symlink-test-")
    );
    const root = path.join(parent, "repository");
    const outside = path.join(parent, "outside");
    const workspacePath = "packages/escape";

    try {
      await fs.mkdir(path.join(root, "packages"), { recursive: true });
      await fs.mkdir(outside, { recursive: true });
      await writeJson(path.join(root, "package.json"), {
        private: true,
        workspaces: [workspacePath],
      });
      await writeJson(path.join(outside, "package.json"), {
        name: "@duskit/escape",
        version: "1.0.0",
      });
      await fs.symlink(
        outside,
        path.join(root, ...workspacePath.split("/")),
        "dir"
      );

      await assert.rejects(
        readAuthoritativeWorkspaces(path.join(root, "package.json")),
        /Workspace symlink escapes repository/
      );
    } finally {
      await fs.rm(parent, { force: true, recursive: true });
    }
  });
});
