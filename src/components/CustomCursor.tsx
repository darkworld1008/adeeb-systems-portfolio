import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type CursorStyle = "cyber" | "minimal" | "off";

interface CustomCursorProps {
  cursorStyle: CursorStyle;
}

export default function CustomCursor({ cursorStyle }: CustomCursorProps) {
  const [isMobile, setIsMobile] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverType, setHoverType] = useState<string | null>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.1 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const checkDevice = () => {
      const mobile =
        window.matchMedia("(max-width: 768px)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;
      setIsMobile(mobile);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    if (isMobile || cursorStyle === "off") {
      document.body.classList.remove("cursor-none-all");
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      const target = e.target as HTMLElement;
      if (target) {
        const clickable = target.closest(
          "button, a, input, select, textarea, [role='button'], .cursor-pointer"
        );
        setIsHovered(!!clickable);
        if (clickable) {
          if (clickable.tagName === "BUTTON") setHoverType("button");
          else if (clickable.tagName === "A") setHoverType("link");
          else if (clickable.tagName === "INPUT" || clickable.tagName === "TEXTAREA") setHoverType("input");
          else setHoverType("clickable");
        } else {
          setHoverType(null);
        }
      }
    };
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    document.body.classList.add("cursor-none-all");
    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.classList.remove("cursor-none-all");
    };
  }, [isMobile, cursorStyle]);

  if (isMobile || cursorStyle === "off") return null;

  /* ─── MINIMAL cursor: tiny dot + thin ring ─── */
  if (cursorStyle === "minimal") {
    return (
      <>
        {/* Precise center dot */}
        <motion.div
          className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[60]"
          style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
          animate={{ scale: isClicked ? 0.6 : isHovered ? 1.8 : 1, backgroundColor: isHovered ? "#00ffcc" : "#ffffff" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
        {/* Thin lag ring */}
        <motion.div
          className="fixed top-0 left-0 w-7 h-7 rounded-full border border-white/40 pointer-events-none z-[60]"
          style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
          animate={{
            scale: isClicked ? 0.7 : isHovered ? 1.4 : 1,
            borderColor: isHovered ? "rgba(0,255,204,0.7)" : "rgba(255,255,255,0.35)",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        />
      </>
    );
  }

  /* ─── CYBER cursor: original full crosshair/ring design ─── */
  return (
    <>
      {/* Precise Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-neon-cyan rounded-full pointer-events-none z-[60] mix-blend-screen"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: isClicked ? 0.7 : isHovered ? 1.4 : 1, backgroundColor: isHovered ? "#ff00ff" : "#00ffff" }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />

      {/* Cybernetic Tracking Ring & Outer Crosshair lines */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[60] flex items-center justify-center mix-blend-screen"
        style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: isClicked ? 1.5 : isHovered ? 1.25 : 1, rotate: isHovered ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" className="w-12 h-12" fill="none">
          <motion.circle
            cx="24"
            cy="24"
            r={isHovered ? "18" : "14"}
            stroke={isHovered ? "#ff00ff" : "#00ffff"}
            strokeWidth="1.2"
            strokeDasharray={isHovered ? "6 4" : "4 6"}
            animate={{ strokeDashoffset: isHovered ? [0, 40] : [0, -20] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
            className="opacity-70"
          />
          <line x1="24" y1="4" x2="24" y2="9" stroke={isHovered ? "#ff00ff" : "#00ffff"} strokeWidth="1" className="opacity-40" />
          <line x1="24" y1="39" x2="24" y2="44" stroke={isHovered ? "#ff00ff" : "#00ffff"} strokeWidth="1" className="opacity-40" />
          <line x1="4" y1="24" x2="9" y2="24" stroke={isHovered ? "#ff00ff" : "#00ffff"} strokeWidth="1" className="opacity-40" />
          <line x1="39" y1="24" x2="44" y2="24" stroke={isHovered ? "#ff00ff" : "#00ffff"} strokeWidth="1" className="opacity-40" />
          {isHovered && (
            <>
              <path d="M 12,12 L 10,12 L 10,10 L 12,10" stroke="#ff00ff" strokeWidth="1.5" />
              <path d="M 36,12 L 38,12 L 38,10 L 36,10" stroke="#ff00ff" strokeWidth="1.5" />
              <path d="M 12,36 L 10,36 L 10,38 L 12,38" stroke="#ff00ff" strokeWidth="1.5" />
              <path d="M 36,36 L 38,36 L 38,38 L 36,38" stroke="#ff00ff" strokeWidth="1.5" />
            </>
          )}
        </svg>

        {isHovered && hoverType && (
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 22 }}
            className="absolute left-full bg-black/95 border border-[#ff00ff] text-[#ff00ff] font-mono text-[7px] font-extrabold px-1.5 py-0.5 whitespace-nowrap leading-none select-none tracking-widest uppercase shadow-[0_0_8px_rgba(255,0,255,0.4)] pointer-events-none"
          >
            SYS_TRK://{hoverType}
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
