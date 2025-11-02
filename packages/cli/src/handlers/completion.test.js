import { deepStrictEqual } from "node:assert";
import { describe, it, mock } from "node:test";

// Temporarily replace console.log to capture output
const originalConsoleLog = console.log;
const consoleLogMock = mock.fn();
console.log = consoleLogMock;

const { completionHandler } = await import("./completion.ts");

describe("completionHandler", () => {
  it("should output PowerShell completion script when requested", () => {
    consoleLogMock.mock.resetCalls();

    completionHandler(["powershell"]);

    deepStrictEqual(consoleLogMock.mock.calls.length > 0, true);
    const out = consoleLogMock.mock.calls[0].arguments[0];
    // Basic sanity checks: contains Register-ArgumentCompleter and phantom list
    deepStrictEqual(typeof out, "string");
    deepStrictEqual(out.includes("Register-ArgumentCompleter"), true);
    deepStrictEqual(out.includes("phantom list --names"), true);
  });
});

// restore console.log
console.log = originalConsoleLog;
