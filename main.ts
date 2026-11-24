process.umask(0o022);

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Second pass: gave it a proper error code like a real appliance would,
// and put the blame where it belongs, on the dial setting. Kept the pale
// side and the charcoal side, since that is how toast actually goes wrong
// in my kitchen anyway.
const LINE =
  "Error 07: one side is pale, the other is basically charcoal, and somehow that's my fault for following your dial.";

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
