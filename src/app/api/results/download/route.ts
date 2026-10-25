import { NextRequest, NextResponse } from "next/server";
import { RESULTS_PATH } from "@/const/path";
import { readResult } from "@/lib/serverFiles";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try {
    const name = request.nextUrl.searchParams.get("name") || "";
    return NextResponse.json(await readResult(RESULTS_PATH, name), {
      headers: {
        "Cache-Control": "no-store",
        "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(name)}`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Result unavailable or invalid filename." },
      { status: 404 },
    );
  }
}
