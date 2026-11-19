// `npm run <script> --workspaces` runs the script in each workspace in the
// order of the "workspaces" list in package.json. Fail if that list names a
// package before a workspace it depends on, so builds run in dependency order.
import fs from "node:fs";
import path from "node:path";

const readManifest = (dir) =>
  JSON.parse(fs.readFileSync(path.join(dir, "package.json"), "utf8"));

const { workspaces } = readManifest(".");
const dependencyFields = [
  "dependencies",
  "devDependencies",
  "optionalDependencies",
  "peerDependencies",
];
const problems = [];

if (workspaces.some((entry) => entry.includes("*"))) {
  problems.push("list each workspace explicitly, without globs");
} else {
  const manifests = workspaces.map(readManifest);
  const positions = new Map(manifests.map(({ name }, index) => [name, index]));

  manifests.forEach((manifest, index) => {
    const names = new Set(
      dependencyFields.flatMap((field) => Object.keys(manifest[field] ?? {})),
    );

    for (const name of names) {
      if (positions.has(name) && positions.get(name) > index) {
        problems.push(`${manifest.name} comes before its dependency ${name}`);
      }
    }
  });
}

if (problems.length > 0) {
  console.error(
    `The "workspaces" list in package.json is not in dependency order:\n- ${problems.join("\n- ")}`,
  );
  process.exitCode = 1;
}
