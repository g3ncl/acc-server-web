import { NextResponse } from "next/server";
import { stopAccServer } from "@/lib/server";

export async function POST() {
  try {
    await stopAccServer();
    return NextResponse.json({ message: "Server stopped successfully" });
  } catch (error) {
    console.log("Failed to stop server:", error);
    return NextResponse.json(
      { error: "Failed to stop server" },
      { status: 500 }
    );
  }
}
