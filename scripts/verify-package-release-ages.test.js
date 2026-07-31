import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  collectRegistryPackages,
  verifyReleaseAges,
} from "./verify-package-release-ages.js";

const OLD_DATE = "2020-01-01T00:00:00.000Z";
const NOW = Date.parse("2026-07-31T00:00:00.000Z");
const INTEGRITY_1 = `sha512-${Buffer.from("artifact-one").toString("base64")}`;
const INTEGRITY_2 = `sha512-${Buffer.from("artifact-two").toString("base64")}`;

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
      workspaces: ["packages/example-workspace"],
    },
    [packagePath]: {
      ...(name ? { name } : {}),
      integrity,
      resolved,
      version,
    },
    "packages/example-workspace": {
      version: "1.0.0",
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
  const { packages } = collectRegistryPackages(lockfile);

  return verifyReleaseAges({
    concurrency: 1,
    cutoff: NOW - 7 * 24 * 60 * 60 * 1000,
    exceptions: new Map(),
    fetchMetadata: async () => metadata,
    now: NOW,
    packages,
  });
};

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
          })
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
          })
        ),
      /Unsupported npm alias.*foo -> bar/
    );
  });
});
