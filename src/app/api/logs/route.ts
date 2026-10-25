import { NextResponse } from "next/server";
import path from "node:path";
import { CONFIG_PATH, LOG_PATH } from "@/const/path";
import { readLogTail, readOptionalJson } from "@/lib/serverFiles";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const settings = (await readOptionalJson(
      path.join(CONFIG_PATH, "settings.json"),
    )) as Record<string, unknown> | undefined;
    const secrets = [
      settings?.password,
      settings?.adminPassword,
      settings?.spectatorPassword,
    ].filter((v): v is string => typeof v === "string");
    return NextResponse.json(
      { text: await readLogTail(LOG_PATH, secrets) },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to read server logs." },
      { status: 500 },
    );
  }
}
