import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {
  parseServerJson,
  saveEntryList,
  readOptionalJson,
  validateEntryList,
  readLogTail,
  listResults,
  readResult,
} from "../src/lib/serverFiles";

test("ACC JSON reads UTF-8 and UTF-16LE with and without BOM", () => {
  for (const encoding of ["utf8", "utf16le"] as const)
    for (const bom of ["", "\uFEFF"]) {
      assert.deepEqual(
        parseServerJson(Buffer.from(bom + '{"entries":[]}', encoding)),
        { entries: [] },
      );
    }
});

test("entry lists validate structure, preserve native fields and save atomically as UTF-16LE", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "acc-entry-"));
  try {
    const file = path.join(dir, "entrylist.json");
    assert.equal(await readOptionalJson(file), undefined);
    const value = {
      entries: [
        {
          drivers: [{ playerID: "S76561198000000000", firstName: "Test" }],
          raceNumber: 12,
          forcedCarModel: -1,
          overrideDriverInfo: 0,
          ballastKg: 20,
          customCar: "car.json",
        },
      ],
      forceEntryList: 1,
    };
    await saveEntryList(file, value);
    assert.deepEqual(await readOptionalJson(file), value);
    assert.ok((await fs.readFile(file)).includes(0));
    for (const invalid of [
      null,
      [],
      {},
      { entries: [], forceEntryList: true },
      { entries: [{ drivers: [] }] },
      { entries: [{ drivers: [{ playerID: 42 }] }] },
    ])
      assert.throws(() => validateEntryList(invalid));
    assert.deepEqual(await fs.readdir(dir), ["entrylist.json"]);
    await saveEntryList(file, { entries: [], forceEntryList: 0 });
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
});

test("logs are bounded, redact configured secrets and tolerate a missing file", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "acc-logs-"));
  try {
    const file = path.join(dir, "wine.log");
    assert.equal(await readLogTail(file), "");
    await fs.writeFile(
      file,
      "old output\n".repeat(1000) +
        'password=hidden adminPassword="adminsecret"\nconnected token supersecret\n',
    );
    const text = await readLogTail(file, ["supersecret"], 200);
    assert.ok(Buffer.byteLength(text) < 250);
    assert.ok(text.includes("[REDACTED]"));
    for (const secret of ["hidden", "adminsecret", "supersecret"])
      assert.ok(!text.includes(secret));
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
});

test("results list real JSON files and reject traversal, symlinks and oversized downloads", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "acc-results-"));
  try {
    assert.deepEqual(await listResults(path.join(dir, "missing")), []);
    await fs.writeFile(path.join(dir, "race.json"), '{"sessionType":"R"}');
    await fs.writeFile(path.join(dir, "ignored.txt"), "text");
    await fs.symlink(path.join(dir, "race.json"), path.join(dir, "link.json"));
    assert.deepEqual(
      (await listResults(dir)).map((file) => file.name),
      ["race.json"],
    );
    assert.deepEqual(await readResult(dir, "race.json"), { sessionType: "R" });
    for (const name of [
      "../race.json",
      "..\\race.json",
      "/race.json",
      "ignored.txt",
      "link.json",
      "missing.json",
    ])
      await assert.rejects(readResult(dir, name));
    const file = await fs.open(path.join(dir, "large.json"), "w");
    await file.truncate(11 * 1024 * 1024);
    await file.close();
    await assert.rejects(readResult(dir, "large.json"));
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
});
