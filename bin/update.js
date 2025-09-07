#!/usr/bin/env node
const { run, detectPip, detectPipx, isSuperKiroInstalledPipx, checkPythonEnvironment } = require("./checkEnv");

console.log("🔄 Checking for SuperKiro updates...");

// Detect installation method
const isExternallyManaged = checkPythonEnvironment();
let updateMethod = null;

// Check if installed via pipx
if (detectPipx() && isSuperKiroInstalledPipx()) {
  updateMethod = "pipx";
  console.log("✅ Detected pipx installation");
} else {
  // Check for pip installation
  let pipCmd = detectPip();
  if (!pipCmd) {
    console.error("❌ Neither pipx nor pip found, cannot update.");
    console.error("   Please install SuperKiro first using:");
    console.error("   pipx install SuperKiro");
    console.error("   or");
    console.error("   pip install SuperKiro");
    process.exit(1);
  }
  
  if (isExternallyManaged) {
    updateMethod = "pip-user";
    console.log("✅ Detected pip installation with --user flag");
  } else {
    updateMethod = "pip";
    console.log("✅ Detected standard pip installation");
  }
}

// Perform update based on detected method
console.log("🔄 Updating SuperKiro from PyPI...");

let result;
switch(updateMethod) {
  case "pipx":
    result = run("pipx", ["upgrade", "SuperKiro"], { stdio: "inherit" });
    break;
  case "pip-user":
    result = run(detectPip(), ["install", "--upgrade", "--user", "SuperKiro"], { stdio: "inherit" });
    break;
  case "pip":
    result = run(detectPip(), ["install", "--upgrade", "SuperKiro"], { stdio: "inherit" });
    break;
}

if (result.status !== 0) {
  console.error("❌ Update failed.");
  if (updateMethod === "pip" && isExternallyManaged) {
    console.error("   Your system requires pipx or --user flag for pip operations.");
    console.error("   Try: pipx upgrade SuperKiro");
    console.error("   Or:  pip install --upgrade --user SuperKiro");
  }
  process.exit(1);
}

console.log("✅ SuperKiro updated successfully!");

// Run SuperKiro update command
console.log("\n🚀 Running SuperKiro update...");
const updateResult = run("SuperKiro", ["update"], { stdio: "inherit" });

if (updateResult.status !== 0) {
  console.log("\n⚠️  Could not run 'SuperKiro update' automatically.");
  console.log("   Please run it manually:");
  console.log("   SuperKiro update");
}
