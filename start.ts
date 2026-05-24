import { spawn } from "child_process";
import path from "path";

function run(name: string, cmd: string, cwd: string) {
  const proc = spawn(cmd, {
    cwd: path.resolve(cwd),
    shell: true,
    stdio: "inherit"
  });

  proc.on("close", (code) => {
    console.log(`[${name}] exited with code ${code}`);
  });

  return proc;
}

console.log("🚀 Starting Staff Portal (FULL SYSTEM)");

run("SERVER", "npm run dev", "./server");
run("CLIENT", "npm run dev", "./client");