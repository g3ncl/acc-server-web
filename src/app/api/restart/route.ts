import { NextResponse } from "next/server";
import { restartAccServer } from "@/lib/server";

export async function POST() {
  try {
    await restartAccServer();
    return NextResponse.json({ message: "Server restarted successfully" });
  } catch (error) {
    console.log("Failed to restart server:", error);
    return NextResponse.json(
      { error: "Failed to restart server" },
      { status: 500 }
    );
  }
}
