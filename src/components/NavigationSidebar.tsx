import { useState, useEffect } from "react";
import { Folder, Code2, Play, FileText, Settings, RefreshCw, Clock, Award } from "lucide-react";

interface NavigationSidebarProps {
  activeSection: string;
  onSectionSelect: (sectionId: string) => void;
  onTriggerReboot: () => void;
}

export default function NavigationSidebar({
  activeSection,
  onTriggerReboot
}: NavigationSidebarProps) {
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      setLocalTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const timerId = setInterval(updateTime, 1000);
    return () => clearInterval(timerId);
  }, []);

  const navItems = [
    { id: "root", label: "ROOT", icon: Folder, href: "#profile-section" },
    { id: "src",  label: "SRC",  icon: Code2,  href: "#cores-section" },
    { id: "cred", label: "CRED", icon: Award,  href: "#credits-section" },
    { id: "exec", label: "WORKS",icon: Play,   href: "#assets-section" },
    { id: "logs", label: "LOGS", icon: FileText,href: "#terminal-section" },
    { id: "sys",  label: "SYS",  icon: Settings,href: "#contact-section" }
  ];

  return (
    <>
      {/* ─── DESKTOP: Fixed Left Sidebar (hidden on mobile) ─── */}
      <aside className="hidden sm:flex w-16 flex-col justify-between items-center bg-[#0d0d0d] border-r border-[#3a4a49] py-4 h-screen fixed top-0 left-0 z-50">
        {/* Top Brand Logo */}
        <div className="flex flex-col items-center gap-1.5 w-full select-none pointer-events-none">
          <div className="w-10 h-10 border border-neon-cyan flex items-center justify-center font-display text-base text-neon-cyan bg-neon-cyan/5">
            AS
          </div>
          <div className="w-1.5 h-1.5 bg-[#00ffcc] rounded-full animate-ping mt-1"></div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2 w-full px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`flex flex-col items-center justify-center w-full py-2.5 transition-all duration-200 border-l-2 relative group no-underline ${
                  isActive
                    ? "border-neon-orange text-neon-orange bg-neon-orange/5"
                    : "border-transparent text-[#b9cac9] hover:text-neon-cyan hover:bg-neon-cyan/5"
                }`}
                title={item.label}
              >
                <Icon className="w-4 h-4 pointer-events-none" />
                <span className="font-mono text-[8px] font-bold mt-1 tracking-wider select-none pointer-events-none">
                  {item.label}
                </span>

                {/* Tooltip on hover */}
                <div className="absolute left-16 top-1/2 -translate-y-1/2 ml-1 px-2 py-1 bg-[#111111] border border-neon-cyan text-neon-cyan text-[8px] font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 select-none">
                  GOTO_{item.label.toUpperCase()}
                </div>
              </a>
            );
          })}
        </nav>

        {/* Bottom Clock and Reboot */}
        <div className="flex flex-col gap-4 items-center w-full">
          {/* Real-time Clock */}
          <div className="flex flex-col items-center text-center text-gray-500 font-mono text-[8px] select-none pointer-events-none">
            <Clock className="w-3.5 h-3.5 text-neon-yellow mb-1 animate-pulse" />
            <span className="text-gray-400 font-bold tracking-tight text-[9px]">{localTime || "00:00:00"}</span>
            <span className="text-[7px] text-gray-600">LOCAL</span>
          </div>

          {/* Reboot Button */}
          <button
            type="button"
            onClick={onTriggerReboot}
            className="w-10 h-10 border border-dashed border-neon-orange/40 hover:border-neon-orange hover:bg-neon-orange/10 flex items-center justify-center text-[#b9cac9] hover:text-neon-orange transition-all duration-300 cursor-pointer group"
            title="INITIALIZE OVERALL REBOOT SEQUENCE"
          >
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700 pointer-events-none" />
          </button>
        </div>
      </aside>

      {/* ─── MOBILE: Fixed Bottom Navigation Bar ─── */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0d0d0d]/95 border-t border-[#3a4a49] flex items-stretch h-14 backdrop-blur-sm">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 no-underline transition-all duration-200 border-t-2 ${
                isActive
                  ? "border-neon-orange text-neon-orange bg-neon-orange/5"
                  : "border-transparent text-[#6a7a79] active:text-neon-cyan"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-mono text-[7px] font-bold tracking-wider">{item.label}</span>
            </a>
          );
        })}
        {/* Reboot button at end */}
        <button
          type="button"
          onClick={onTriggerReboot}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 border-t-2 border-transparent text-[#6a7a79] active:text-neon-orange transition-all duration-200 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="font-mono text-[7px] font-bold tracking-wider">BOOT</span>
        </button>
      </nav>
    </>
  );
}
