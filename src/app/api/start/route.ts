import { NextResponse } from "next/server";
import { startAccServer } from "@/lib/server";

export async function POST() {
  try {
    await startAccServer();
    return NextResponse.json({ message: "Server started successfully" });
  } catch (error) {
    console.log("Failed to start server:", error);
    return NextResponse.json(
      { error: "Failed to start server" },
      { status: 500 }
    );
  }
}
