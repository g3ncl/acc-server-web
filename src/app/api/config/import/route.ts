import { NextResponse } from "next/server";
import { CONFIG_PATH } from "@/const/path";
import fs from "fs-extra";
import AdmZip from "adm-zip";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert uploaded file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Create and extract zip
    const zip = new AdmZip(buffer);

    // Ensure directory exists
    await fs.ensureDir(CONFIG_PATH);

    // Extract only JSON files
    zip.getEntries().forEach((entry) => {
      if (entry.entryName.endsWith(".json")) {
        zip.extractEntryTo(entry, CONFIG_PATH, false, true);
      }
    });

    return NextResponse.json({
      message: "Config files imported successfully",
    });
  } catch (error) {
    console.error("Failed to import config files:", error);
    return NextResponse.json(
      { error: "Failed to import config files" },
      { status: 500 }
    );
  }
}
