import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { Terminal } from "lucide-react";
import { ConsoleLine } from "../types";
import SnakeGame from "./SnakeGame";

interface BootLogTerminalProps {
  logs: ConsoleLine[];
  onAddLog: (text: string, type: "system" | "kernel" | "user" | "success" | "warning" | "error") => void;
  onClearLogs: () => void;
}

export default function BootLogTerminal({ logs, onAddLog, onClearLogs }: BootLogTerminalProps) {
  const [inputVal, setInputVal] = useState("");
  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState(false);
  const [isSnakeActive, setIsSnakeActive] = useState(false);
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto scroll to bottom of logs WITHIN the terminal container only (not the page)
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommandSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    const cmd = inputVal.trim().toLowerCase();
    setInputVal("");

    if (!cmd) return;

    onAddLog(`adeeb-core_os$ ${cmd}`, "user");

    setTimeout(() => {
      if (cmd === "help") {
        onAddLog("AVAILABLE SUBROUTINES:", "system");
        onAddLog("  help       - Display available system terminal commands", "system");
        onAddLog("  diagnose   - Execute core hardware & runtime diagnostics", "system");
        onAddLog("  scan       - Run visual scanner across active sectors", "system");
        onAddLog("  clear      - Clear the console logs entirely", "system");
        onAddLog("  operator   - Output Operator ID credentials & biometric data", "system");
        onAddLog("  snake      - Initialize hidden sub-core game interface", "success");
      } else if (cmd === "clear") {
        onClearLogs();
      } else if (cmd === "diagnose") {
        setIsDiagnosticRunning(true);
        onAddLog("LAUNCHING DIAGNOSTIC STREAM...", "warning");
        onAddLog("[CORE] CPU Load: 12% - Nominal", "system");
        onAddLog("[MEMORY] 16GB ECC DDR5 - Cache Verified", "system");
        onAddLog("[NETWORK] Latency: 1.2ms - Connection SECURE", "success");
        onAddLog("[SYSTEM] Port 3000 ingress routing verified. Nginx forwarder alive.", "success");
        setTimeout(() => setIsDiagnosticRunning(false), 1500);
      } else if (cmd === "scan") {
        onAddLog("SCANNING CORES...", "warning");
        onAddLog("  Sector A (Python): [OK] — Version 3.11", "success");
        onAddLog("  Sector B (JavaScript): [OK] — React 19 Engine Ready", "success");
        onAddLog("  Sector C (Linux): [OK] — Arch Core 6.15.0-76-generic", "success");
      } else if (cmd === "operator") {
        onAddLog("OPERATOR_ID: 10101", "warning");
        onAddLog("  Name: Adeeb Ahammed K M", "system");
        onAddLog("  Institution: KMCT Engineering College", "system");
        onAddLog("  Specialties: Interface Engineering, Linux setups, Full-Stack Node", "system");
        onAddLog("  Status: Fully Operational", "success");
      } else if (cmd === "snake" || cmd === "play" || cmd === "game") {
        setIsSnakeActive(true);
        onAddLog("SNAKE_OS: Activating sub-core game interface. Ready to initialize.", "warning");
      } else {
        onAddLog(`Command not recognized: '${cmd}'. Type 'help' for core commands.`, "error");
      }
    }, 100);
  };

  const triggerDiagnostic = () => {
    setIsDiagnosticRunning(true);
    onAddLog("CLI_TRIGGER: INIT_DIAGNOSTIC_SEQUENCE", "user");
    setTimeout(() => {
      onAddLog("CHECKING PIPELINES... ALL CORES RESPONDING AT PEAK BANDWIDTH", "success");
      setIsDiagnosticRunning(false);
    }, 1000);
  };

  return (
    <div className="relative flex flex-col h-full bg-[#0a0a0a] border border-[#3a4a49] font-mono select-none overflow-hidden">
      {/* Terminal Title Bar */}
      <div className="flex justify-between items-center bg-[#131313] border-b border-[#3a4a49] px-3 py-1 text-[10px] tracking-wider text-[#b9cac9]">
        <div className="flex items-center gap-1.5 text-neon-cyan">
          <Terminal className="w-3.5 h-3.5" />
          <span>SYSTEM_BOOT_LOG</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[8px] text-neon-cyan font-bold tracking-widest border border-neon-cyan/30 px-1 py-0.2 bg-neon-cyan/5 rounded-sm animate-pulse">
            EGG_MODULE: LOADED
          </span>
          <span className="text-neon-yellow animate-pulse">● RECORDING</span>
          <button 
            onClick={triggerDiagnostic}
            disabled={isDiagnosticRunning}
            className="px-1.5 py-0.5 bg-neon-cyan/10 hover:bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 text-[9px] cursor-pointer transition-colors"
          >
            {isDiagnosticRunning ? "RUNNING..." : "RUN_TEST"}
          </button>
        </div>
      </div>

      {/* Terminal Lines View */}
      <div ref={terminalContainerRef} className="flex-1 p-3 overflow-y-auto text-[10px] space-y-1.5 h-[230px] md:h-[310px] scrollbar-thin">
        {logs.map((log, index) => {
          let typeColor = "text-[#b9cac9]"; // default gray
          if (log.type === "success") typeColor = "text-[#00ffcc]";
          if (log.type === "warning") typeColor = "text-neon-yellow";
          if (log.type === "error") typeColor = "text-neon-orange font-bold";
          if (log.type === "user") typeColor = "text-neon-cyan";
          if (log.type === "kernel") typeColor = "text-[#00ffff]/80";

          return (
            <div key={index} className="flex items-start gap-2 leading-relaxed">
              <span className="text-gray-600 select-none text-[9px] shrink-0">
                {log.timestamp}
              </span>
              <span className={`${typeColor} break-all`}>
                {log.text}
              </span>
            </div>
          );
        })}
        {isDiagnosticRunning && (
          <div className="flex items-center gap-2 text-neon-yellow text-[9px]">
            <span className="animate-spin text-neon-cyan">⚙</span>
            <span>DIAGNOSTIC CONTEXT INJECTION IN PROGRESS... [CORE_STABLE]</span>
          </div>
        )}

      </div>

      {/* Static Info Badges overlaying inside layout */}
      <div className="grid grid-cols-3 border-t border-[#3a4a49] bg-[#0c0c0c] text-[9px] text-center text-gray-400 py-1">
        <div className="border-r border-[#3a4a49]">
          <span className="text-gray-600">[SEC_CHECK]:</span> <span className="text-[#00ffcc] font-bold">PASS</span>
        </div>
        <div className="border-r border-[#3a4a49]">
          <span className="text-gray-600">[OPERATOR]:</span> <span className="text-neon-cyan">ADEEB</span>
        </div>
        <div>
          <span className="text-gray-600">[LOCATION]:</span> <span className="text-neon-orange">KERALA_IN</span>
        </div>
      </div>

      {/* Live Command Line Input */}
      <div className="flex items-center bg-[#070707] border-t border-[#3a4a49] px-2 py-1.5 text-[10px]">
        <span className="text-neon-cyan mr-1.5 shrink-0">adeeb-core_os$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleCommandSubmit}
          placeholder="type 'help' or 'snake'..."
          className="flex-1 bg-transparent border-none outline-none text-[#ffffff] focus:ring-0 placeholder-gray-700 font-mono py-0 h-4"
        />
      </div>

      {/* Snake Game Overlay */}
      {isSnakeActive && (
        <SnakeGame 
          onClose={() => setIsSnakeActive(false)} 
          onAddLog={onAddLog} 
        />
      )}
    </div>
  );
}
