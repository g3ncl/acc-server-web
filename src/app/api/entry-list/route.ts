import { NextRequest, NextResponse } from "next/server";
import path from "node:path";
import { CONFIG_PATH } from "@/const/path";
import {
  readOptionalJson,
  saveEntryList,
  validateEntryList,
} from "@/lib/serverFiles";
export const dynamic = "force-dynamic";
const filename = () => path.join(CONFIG_PATH, "entrylist.json");
export async function GET() {
  try {
    return NextResponse.json(
      (await readOptionalJson(filename())) ?? {
        entries: [],
        forceEntryList: 0,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to read the entry list." },
      { status: 500 },
    );
  }
}
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin) {
    let valid = false;
    try {
      valid = new URL(origin).host === request.headers.get("host");
    } catch {
      /* Invalid origins are rejected. */
    }
    if (!valid)
      return NextResponse.json(
        { error: "Cross-origin changes are not allowed." },
        { status: 403 },
      );
  }
  try {
    const reader = request.body?.getReader();
    if (!reader)
      return NextResponse.json(
        { error: "JSON body required." },
        { status: 400 },
      );
    const chunks: Uint8Array[] = [];
    let size = 0;
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 1024 * 1024) {
        await reader.cancel();
        return NextResponse.json(
          { error: "Entry list exceeds 1 MiB." },
          { status: 413 },
        );
      }
      chunks.push(value);
    }
    const data = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    validateEntryList(data);
    await saveEntryList(filename(), data);
    return NextResponse.json({
      message: "Entry list saved. Restart the server to apply it.",
    });
  } catch (error) {
    const invalid =
      error instanceof SyntaxError ||
      (error instanceof Error && /Entry|forceEntryList/.test(error.message));
    return NextResponse.json(
      {
        error: invalid
          ? (error as Error).message
          : "Unable to save the entry list.",
      },
      { status: invalid ? 400 : 500 },
    );
  }
}
