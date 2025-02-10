import { NextResponse } from "next/server";
import fs from "fs-extra";
import path from "path";
import { Configs } from "@/types/configTypes";
import { CONFIG_PATH } from "@/const/path";

export async function GET() {
  try {
    const configFiles: Configs = {};
    const files = [
      "configuration",
      "settings",
      "event",
      "eventRules",
      "assistRules",
      "entrylist",
      "bop",
    ];

    for (const file of files) {
      const filePath = path.join(CONFIG_PATH, `${file}.json`);
      console.log(filePath);
      if (await fs.pathExists(filePath)) {
        const content = await fs.readFile(filePath, { encoding: "utf-16le" });
        // Removing BOM if present
        const cleanedContent = content.replace(/^\uFEFF/, "");
        configFiles[file as keyof Configs] = JSON.parse(cleanedContent);
      }
    }

    return NextResponse.json(configFiles);
  } catch (error) {
    console.log("Failed to read config files:", error);
    return NextResponse.json(
      { error: "Failed to read config files" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data: Configs = await request.json();

    for (const [filename, content] of Object.entries(data)) {
      const filePath = path.join(CONFIG_PATH, `${filename}.json`);
      const jsonString = JSON.stringify(content, null, 2);
      await fs.writeFile(filePath, jsonString, { encoding: "utf-16le" });
    }

    return NextResponse.json({ message: "Config files updated successfully" });
  } catch (error) {
    console.log("Failed to update config files:", error);
    return NextResponse.json(
      { error: "Failed to update config files" },
      { status: 500 }
    );
  }
}
