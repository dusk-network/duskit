import fs from "node:fs";
import path from "node:path";

for (const target of process.argv.slice(2)) {
  const resolvedTarget = path.resolve(target);
  const root = path.parse(resolvedTarget).root;

  if (resolvedTarget === root || resolvedTarget === process.cwd()) {
    throw new Error(`Refusing to remove unsafe path: ${target}`);
  }

  fs.rmSync(resolvedTarget, {
    force: true,
    maxRetries: 3,
    recursive: true,
    retryDelay: 100,
  });
}
