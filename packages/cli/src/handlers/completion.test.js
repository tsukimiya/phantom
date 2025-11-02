import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";

// Capture stdout (process.stdout.write) to verify completionHandler output
const originalStdoutWrite = process.stdout.write;
let stdoutBuffer = "";
function startCapture() {
  stdoutBuffer = "";
  process.stdout.write = (chunk, encoding, cb) => {
    stdoutBuffer += chunk instanceof Buffer ? chunk.toString() : chunk;
    if (typeof cb === "function") cb();
    return true;
  };
}
function stopCapture() {
  process.stdout.write = originalStdoutWrite;
}

const { completionHandler } = await import("./completion.ts");

describe("completionHandler", () => {
  it("should output PowerShell completion script when requested", () => {
    startCapture();
    try {
      completionHandler(["powershell"]);
    } finally {
      stopCapture();
    }

    // Basic sanity checks: contains Register-ArgumentCompleter and phantom list
    deepStrictEqual(typeof stdoutBuffer, "string");
    deepStrictEqual(stdoutBuffer.includes("Register-ArgumentCompleter"), true);
    deepStrictEqual(stdoutBuffer.includes("phantom list --names"), true);
  });
});
