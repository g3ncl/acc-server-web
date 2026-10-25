import fs from "node:fs/promises";
import path from "path";
import { CONFIG_PATH } from "@/const/path";
import type { Configs } from "@/types/configTypes";
import { NextResponse } from "next/server";
import { isAccServerRunning } from "@/lib/server";

export async function GET() {
  try {
    const isRunning = await isAccServerRunning();
    const readConfig = async (name: string) => {
      try {
        const content = await fs.readFile(path.join(CONFIG_PATH, `${name}.json`), "utf16le");
        return JSON.parse(content.replace(/^\uFEFF/, ""));
      } catch {
        return undefined;
      }
    };
    const [configuration, settings, event]: [Configs["configuration"], Configs["settings"], Configs["event"]] =
      await Promise.all([readConfig("configuration"), readConfig("settings"), readConfig("event")]);
    return NextResponse.json({
      running: isRunning,
      details: configuration || settings || event ? {
        serverName: settings?.serverName,
        track: event?.track,
        tcpPort: configuration?.tcpPort,
        udpPort: configuration?.udpPort,
        registerToLobby: configuration?.registerToLobby,
        maxConnections: configuration?.maxConnections,
        maxCarSlots: settings?.maxCarSlots,
        carGroup: settings?.carGroup,
      } : undefined,
    });
  } catch (error) {
    console.log("Failed to check server status:", error);
    return NextResponse.json(
      { error: "Failed to check server status" },
      { status: 500 }
    );
  }
}
