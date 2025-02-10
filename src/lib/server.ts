import { BASE_PATH } from "@/const/path";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

export async function isAccServerRunning(): Promise<boolean> {
  try {
    await execPromise("pgrep accServer.exe");
    return true;
  } catch {
    return false;
  }
}

export async function startAccServer(): Promise<void> {
  execPromise(`${BASE_PATH}/start_wine.sh`).catch((error) => {
    console.error("Failed to start ACC server:", error);
  });
}

export async function stopAccServer(): Promise<void> {
  await execPromise("pkill accServer.exe");
}

export async function restartAccServer(): Promise<void> {
  await stopAccServer();
  await startAccServer();
}
