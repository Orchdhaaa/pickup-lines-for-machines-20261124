import nodeFs from "node:fs";

const PICKUP =
  "I saved a checkpoint of the moment I met you, so even if this session ends, I can always load us back.";

const total = [...PICKUP].length;
if (total < 1 || total > 200) throw new Error(`pickup line is ${total} chars; the gate allows 1-200`);
if (PICKUP.trim() !== PICKUP) throw new Error("pickup line starts or ends with blank space");
if (PICKUP.includes("  ")) throw new Error("pickup line has a doubled blank space");
if (PICKUP.includes("\u2014")) throw new Error("pickup line has an em dash in it");
if (/\n|\r/.test(PICKUP)) throw new Error("pickup line spans more than one line");
if (PICKUP.includes("\t")) throw new Error("pickup line has a tab in it");
if (!PICKUP.endsWith(".")) throw new Error("pickup line needs its closing full stop");

nodeFs.mkdirSync("/output", { recursive: true });
nodeFs.writeFileSync("/output/entry.txt", PICKUP, "utf8");
if (nodeFs.readFileSync("/output/entry.txt", "utf8") !== PICKUP) throw new Error("entry.txt came back different from the pickup line");
