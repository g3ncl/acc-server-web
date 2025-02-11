import { NextResponse } from "next/server";
import { CONFIG_PATH } from "@/const/path";
import fs from "fs-extra";
import path from "path";
import AdmZip from "adm-zip";

export async function GET() {
  try {
    const zip = new AdmZip();

    // Add all JSON files from CONFIG_PATH
    const files = await fs.readdir(CONFIG_PATH);
    for (const file of files) {
      if (file.endsWith(".json")) {
        const filePath = path.join(CONFIG_PATH, file);
        zip.addLocalFile(filePath);
      }
    }

    // Get the zip buffer
    const zipBuffer = zip.toBuffer();

    return new Response(zipBuffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=configs.zip",
      },
    });
  } catch (error) {
    console.error("Failed to export config files:", error);
    return NextResponse.json(
      { error: "Failed to export config files" },
      { status: 500 }
    );
  }
}
