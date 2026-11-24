process.umask(0o022);

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// First draft of the line. It has the burnt-toast complaint in it, but the
// wording is still a bit plain, so it will probably get tightened up.
const LINE =
  "Error: your toast came out burnt on one side and raw on the other, please stop blaming me.";

function main(): void {
  if (LINE.length < 1 || LINE.length > 120 || LINE.trim().length === 0) {
    throw new Error(`entry must be 1-120 non-blank characters, got ${LINE.length}`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, LINE + "\n", "utf8");
  const written = readFileSync(outPath, "utf8");
  if (written.trim().length < 1 || written.trim().length > 120) {
    throw new Error(`entry.txt failed the 1-120 character gate, got ${written.trim().length}`);
  }
}

main();
