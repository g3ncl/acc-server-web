import { NextResponse } from "next/server";
import { isAccServerRunning } from "@/lib/server";

export async function GET() {
  try {
    const isRunning = await isAccServerRunning();
    return NextResponse.json({ running: isRunning });
  } catch (error) {
    console.log("Failed to check server status:", error);
    return NextResponse.json(
      { error: "Failed to check server status" },
      { status: 500 }
    );
  }
}
