import { NextResponse } from "next/server";
import { RESULTS_PATH } from "@/const/path";
import { listResults } from "@/lib/serverFiles";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    return NextResponse.json(await listResults(RESULTS_PATH), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to list results." },
      { status: 500 },
    );
  }
}
