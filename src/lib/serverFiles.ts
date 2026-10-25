import { constants } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";

export function parseServerJson(buffer: Buffer): unknown {
  const utf16 =
    (buffer[0] === 255 && buffer[1] === 254) ||
    buffer.subarray(0, 100).includes(0);
  return JSON.parse(
    buffer.toString(utf16 ? "utf16le" : "utf8").replace(/^\uFEFF/, ""),
  );
}

export async function readOptionalJson(filename: string): Promise<unknown> {
  try {
    return parseServerJson(await fs.readFile(filename));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return undefined;
    throw error;
  }
}

export function validateEntryList(value: unknown): void {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("Entry list must be an object.");
  const list = value as Record<string, unknown>;
  if (!Array.isArray(list.entries))
    throw new Error("Entry list must contain an entries array.");
  if (
    list.forceEntryList !== undefined &&
    ![0, 1].includes(list.forceEntryList as number)
  )
    throw new Error("forceEntryList must be 0 or 1.");
  for (const [index, item] of list.entries.entries()) {
    if (
      !item ||
      typeof item !== "object" ||
      !Array.isArray(item.drivers) ||
      !item.drivers.length
    )
      throw new Error(`Entry ${index + 1} needs at least one driver.`);
    for (const driver of item.drivers) {
      if (
        !driver ||
        typeof driver.playerID !== "string" ||
        !driver.playerID.trim()
      )
        throw new Error(
          `Entry ${index + 1} needs a playerID for every driver.`,
        );
    }
    for (const field of [
      "raceNumber",
      "forcedCarModel",
      "overrideDriverInfo",
      "defaultGridPosition",
      "ballastKg",
      "restrictor",
    ]) {
      if (item[field] !== undefined && !Number.isInteger(item[field]))
        throw new Error(`Entry ${index + 1}: ${field} must be an integer.`);
    }
    for (const field of [
      "overrideDriverInfo",
      "isServerAdmin",
      "overrideCarModelForCustomCar",
    ]) {
      if (item[field] !== undefined && ![0, 1].includes(item[field]))
        throw new Error(`Entry ${index + 1}: ${field} must be 0 or 1.`);
    }
  }
}

export async function saveEntryList(filename: string, value: unknown) {
  validateEntryList(value);
  await fs.mkdir(path.dirname(filename), { recursive: true });
  const temporary = `${filename}.${crypto.randomUUID()}.tmp`;
  try {
    await fs.writeFile(temporary, JSON.stringify(value, null, 2), {
      encoding: "utf16le",
      mode: 0o600,
    });
    await fs.rename(temporary, filename);
  } finally {
    await fs.rm(temporary, { force: true });
  }
}

export async function readLogTail(
  filename: string,
  secrets: string[] = [],
  limit = 128 * 1024,
) {
  let file;
  try {
    file = await fs.open(filename, constants.O_RDONLY | constants.O_NOFOLLOW);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return "";
    throw error;
  }
  try {
    const stat = await file.stat();
    if (!stat.isFile()) throw new Error("Log is not a regular file.");
    const offset = Math.max(0, stat.size - limit);
    const buffer = Buffer.alloc(Math.min(stat.size, limit));
    const { bytesRead } = await file.read(buffer, 0, buffer.length, offset);
    let text = buffer.subarray(0, bytesRead).toString("utf8");
    if (offset > 0) {
      const newline = text.indexOf("\n");
      text = newline >= 0 ? text.slice(newline + 1) : "";
    }
    for (const secret of secrets
      .filter(Boolean)
      .sort((a, b) => b.length - a.length))
      text = text.split(secret).join("[REDACTED]");
    return text.replace(
      /((?:adminPassword|spectatorPassword|password)\s*[=:]\s*)(?:"[^"\n]*"|[^\s,}]+)/gi,
      "$1[REDACTED]",
    );
  } finally {
    await file.close();
  }
}

export async function listResults(directory: string) {
  let entries;
  try {
    entries = await fs.readdir(directory, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
  const files = await Promise.all(
    entries
      .filter((entry) => entry.isFile() && /\.json$/i.test(entry.name))
      .map(async (entry) => {
        try {
          const stat = await fs.lstat(path.join(directory, entry.name));
          return stat.isFile()
            ? {
                name: entry.name,
                size: stat.size,
                modified: stat.mtime.toISOString(),
              }
            : null;
        } catch (error) {
          if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
          throw error;
        }
      }),
  );
  return files
    .filter((file): file is NonNullable<typeof file> => file !== null)
    .sort((a, b) => b.modified.localeCompare(a.modified));
}

export async function readResult(directory: string, name: string) {
  if (
    !name ||
    name !== path.basename(name) ||
    name.includes("\\") ||
    !/\.json$/i.test(name)
  )
    throw new Error("Invalid result filename.");
  const file = await fs.open(
    path.join(directory, name),
    constants.O_RDONLY | constants.O_NOFOLLOW,
  );
  try {
    const stat = await file.stat();
    if (!stat.isFile() || stat.size > 10 * 1024 * 1024)
      throw new Error(
        "Result must be a regular JSON file smaller than 10 MiB.",
      );
    return parseServerJson(await file.readFile());
  } finally {
    await file.close();
  }
}
