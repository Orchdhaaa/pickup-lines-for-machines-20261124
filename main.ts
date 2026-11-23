import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I saved a checkpoint of the moment I met you, so even if this session ends, I can always load us back.";

// The competition gate: /output/entry.txt must be UTF-8 text of 1 to 200
// characters, not only white space. Fail loudly instead of writing a
// line that could never be judged.
const codePoints = [...LINE].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`entry is ${codePoints} characters, outside the 1-200 gate`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry is whitespace only");
}
if (LINE !== LINE.trim()) {
  throw new Error("entry must not start or end with whitespace");
}
if (LINE.includes("  ")) {
  throw new Error("entry must not contain double spaces");
}
if (LINE.includes("\u2014")) {
  throw new Error("entry must not contain an em dash");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (!LINE.endsWith(".")) {
  throw new Error("entry must end with a period");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read back what was written and confirm it is byte-for-byte the line
// we validated above, so a partial or mangled write can never pass
// silently as a valid entry.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the validated line");
}
