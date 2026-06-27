import { useState, useEffect } from "react";

interface BIOSBootScreenProps {
  onComplete: () => void;
}

export default function BIOSBootScreen({ onComplete }: BIOSBootScreenProps) {
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const rawLines = [
    "ADEEB_SYSTEMS INC. CORE BIOS v4.26_X64",
    "COPYRIGHT (C) 2026 ADEEB TECHNOLOGIES. ALL RIGHTS RESERVED.",
    "-----------------------------------------------------------",
    "CPU: INTEL CORE ULTRA MAXIMUM FREQUENCY (REG_07_IN)",
    "CPU CLOCK SPEED: 5.20 GHz [STABLE]",
    "SYSTEM MEMORY: 16777216 KB ECC RUNTIME (DDR5-6400)",
    "CACHE LEVEL 1: 512 KB | LEVEL 2: 2048 KB | LEVEL 3: 16384 KB",
    "",
    "SEARCHING FOR STORAGE CONTROLLERS...",
    "  DEV_01: SSD_PORT_0 [STATUS: MOUNTED] - NODE_A: LOOMI_STOREFRONT",
    "  DEV_02: SSD_PORT_1 [STATUS: MOUNTED] - NODE_B: SYSTEM_APP_V2",
    "  DEV_03: SSD_PORT_2 [STATUS: MOUNTED] - NODE_C: ARCH_DOTFILES",
    "",
    "INITIALIZING INTEGRITY AUDITS...",
    "  [SEC_CHECK]: SECURE BOOT ALIVE (PASS)",
    "  [LOCATION ]: LATITUDE: 10.8505° N | LONGITUDE: 76.2711° E",
    "  [IP_INGRESS]: BINDING TO HOST 0.0.0.0 PORT 3000... ONLINE",
    "",
    "UPDATING LOCAL CLOCK STRATUM 1 WITH NETWORK SYSTEM DATUM..."
  ];

  useEffect(() => {
    let lineIdx = 0;
    const lineInterval = setInterval(() => {
      if (lineIdx < rawLines.length) {
        const currentLine = rawLines[lineIdx];
        setBootLines((prev) => [...prev, currentLine]);
        lineIdx++;
      } else {
        clearInterval(lineInterval);
      }
    }, 80);

    return () => clearInterval(lineInterval);
  }, []);

  // Handle the progress bar at the end of the line print
  useEffect(() => {
    if (bootLines.length >= rawLines.length) {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            // Wait 400ms then finish
            setTimeout(onComplete, 500);
            return 100;
          }
          return prev + 10;
        });
      }, 70);

      return () => clearInterval(progressInterval);
    }
  }, [bootLines]);

  return (
    <div className="fixed inset-0 bg-[#050505] text-neon-cyan p-6 md:p-12 font-mono text-xs md:text-sm flex flex-col justify-between z-50 select-none overflow-y-auto">
      {/* Scrollable logs */}
      <div className="space-y-1.5 max-w-3xl">
        {bootLines.map((line, idx) => {
          if (!line) return <div key={idx} className="text-[#b9cac9] h-4"></div>;
          const isHighlight = line.includes("PASS") || line.includes("ONLINE");
          const isAdeeb = line.startsWith("ADEEB");
          return (
            <div 
              key={idx} 
              className={`${
                isHighlight 
                  ? "text-[#00ffcc]" 
                  : isAdeeb 
                    ? "text-neon-orange font-bold glow-orange" 
                    : "text-[#b9cac9]"
              }`}
            >
              {line}
            </div>
          );
        })}

        {/* Loading Progress Bar */}
        {bootLines.length >= rawLines.length && (
          <div className="mt-6 space-y-2">
            <div className="text-neon-yellow font-bold">LOADING SYSTEM KERNEL & OPERATIONAL MODULES...</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-900 border border-[#3a4a49] h-5 relative">
                <div 
                  className="bg-neon-cyan h-full transition-all duration-75 flex items-center justify-end pr-1 text-[9px] font-bold text-black"
                  style={{ width: `${progress}%` }}
                >
                  {progress}%
                </div>
              </div>
              <span className="text-neon-cyan shrink-0 animate-pulse">
                {progress < 100 ? "COMPILING..." : "SUCCESS_SECURE"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <div className="flex justify-between items-center text-[9px] text-gray-600 border-t border-[#3a4a49]/30 pt-4 mt-8">
        <span>ADE_BOOT_LDR v4.26 // DEEP_SPACE_PROTO_LINK</span>
        <span>STATUS_BOOTING: OK</span>
      </div>
    </div>
  );
}
