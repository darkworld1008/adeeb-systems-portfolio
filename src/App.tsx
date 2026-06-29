import { useState, useEffect, useRef, FormEvent } from "react";
import { 
  Folder, 
  Settings, 
  Radio, 
  Download, 
  Terminal, 
  ExternalLink, 
  Send, 
  Copy, 
  MapPin, 
  CheckCircle2, 
  HelpCircle,
  Linkedin,
  Instagram,
  Mail,
  ArrowUpRight,
  BookOpen,
  Globe,
  Briefcase,
  Phone,
  Award,
  Bot,
  MessageSquare,
  User
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ConsoleLine } from "./types";
import { 
  technicalCores, 
  operationalAssets, 
  initialBootLogs,
  educationData,
  languagesData,
  internshipsData,
  certificationsData
} from "./data";
import BootLogTerminal from "./components/BootLogTerminal";
import NavigationSidebar from "./components/NavigationSidebar";
import BIOSBootScreen from "./components/BIOSBootScreen";
import CustomCursor from "./components/CustomCursor";

const channels = [
  {
    name: "EMAIL",
    value: "adeebahamedkm@gmail.com",
    href: "mailto:adeebahamedkm@gmail.com"
  },
  {
    name: "PHONE",
    value: "+91 9037340138",
    href: "tel:+919037340138"
  },
  {
    name: "GITHUB",
    value: "darkworld1008",
    href: "https://github.com/darkworld1008"
  },
  {
    name: "LINKEDIN",
    value: "linkedin",
    href: "https://www.linkedin.com/in/adeeb-ahammed-km-799b0a33b?utm_source=share_via&utm_content=profile&utm_medium=member_android"
  },
  {
    name: "INSTAGRAM",
    value: "ADEEBAHAMMED",
    href: "https://www.instagram.com/adeeeb____?igsh=MTRrYW43MTFpNzZrYQ=="
  }
];

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [activeTab, setActiveTab] = useState("root");
  const [logs, setLogs] = useState<ConsoleLine[]>(initialBootLogs);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  // Contact Form State
  const [contactMessage, setContactMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Tab state for direct packet, chatbot, and comment box
  const [contactTab, setContactTab] = useState<"transmit" | "chatbot" | "comments">("transmit");

  // Interactive AI Chatbot State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "bot"; text: string; timestamp: string }>>([
    { sender: "bot", text: "SYSTEM: Virtual Assistant online. Type your query or select a hotspot command below.", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, isBotTyping]);

  // Comment board local database state
  const [comments, setComments] = useState<Array<{ name: string; comment: string; color: string; timestamp: string }>>(() => {
    const saved = localStorage.getItem("adeeb_comments");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore fallback
      }
    }
    return [
      { name: "GUEST_99", comment: "Incredible UI latency! The neon violet glitch animations are highly satisfying.", color: "text-neon-cyan", timestamp: "10:24 AM" },
      { name: "ROOT_DEV", comment: "Clean project assets structure. All core subcomponents respond instantly.", color: "text-neon-yellow", timestamp: "11:15 AM" },
      { name: "RECRUITER_ALPHA", comment: "Contact packets successfully routed. Eager to initiate project deployment discussions.", color: "text-[#bf00ff]", timestamp: "02:40 PM" }
    ];
  });
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentColor, setCommentColor] = useState("text-neon-cyan");

  const handleSendChatMessage = (e?: FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const text = customText || chatInput;
    if (!text.trim()) return;

    if (!customText) {
      setChatInput("");
    }

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages((prev) => [...prev, { sender: "user", text, timestamp }]);
    setIsBotTyping(true);

    setTimeout(() => {
      let reply = "";
      const cleanText = text.toLowerCase().trim();

      // Core Keyword Matching Engine
      if (cleanText.includes("hello") || cleanText.includes("hi") || cleanText.includes("hey") || cleanText.includes("greetings")) {
        reply = "GREETINGS: Virtual connection established successfully. I am the ADEEB_SYSTEMS chatbot agent. Ask me about the operator's projects, skills, education, or experience.";
      } else if (cleanText.includes("skill") || cleanText.includes("coding") || cleanText.includes("program") || cleanText.includes("technology") || cleanText.includes("tech") || cleanText === "2") {
        reply = "CORE_SKILLS: Python, C, C++, JavaScript, HTML5, CSS3, React, Node.js, PostgreSQL, Git, GitHub, Linux system administration, and AI dev tools.";
      } else if (cleanText.includes("project") || cleanText.includes("loomi") || cleanText.includes("work") || cleanText.includes("portfolio")) {
        reply = "PROJECTS_INDEX: Loomi (responsive website with payment integration), mobile application layouts, and customized Linux environment system configurations.";
      } else if (cleanText.includes("education") || cleanText.includes("college") || cleanText.includes("university") || cleanText.includes("btech") || cleanText.includes("cgpa") || cleanText === "1") {
        reply = "EDUCATION_STATS: Currently pursuing B.Tech in Computer Science & Engineering at KMCT Institute of Technology and Management. Expected graduation: 2028. Current CGPA: 7.0/10.";
      } else if (cleanText.includes("intern") || cleanText.includes("experience") || cleanText.includes("job")) {
        reply = "EXPERIENCE: Cloud Computing Intern (Ongoing). Gaining practical knowledge of cloud computing, infrastructure administration, and deployment methodologies.";
      } else if (cleanText.includes("certif") || cleanText.includes("course") || cleanText.includes("coursera") || cleanText.includes("microsoft")) {
        reply = "CERTIFICATIONS: Microsoft certification programs, Coursera Foundations of Coding, Full-Stack developer certifications, and technology course credentials.";
      } else if (cleanText.includes("contact") || cleanText.includes("hire") || cleanText.includes("email") || cleanText.includes("phone") || cleanText.includes("mail") || cleanText === "3") {
        reply = "CONTACT_COORDINATES: Tanur, Malappuram, Kerala, India. Direct email: adeebahamedkm@gmail.com | Phone: +91 9037340138. Route inquiry packets via the TRANSMIT tab.";
      } else if (cleanText.includes("language")) {
        reply = "LANGUAGES_INDEX: Fluent communication channels established in English, Malayalam, and Hindi.";
      } else if (cleanText.includes("career") || cleanText.includes("objective") || cleanText.includes("goal")) {
        reply = "CAREER_OBJECTIVE: To build a successful career as a Freelance Web Developer and Application Developer by leveraging technical expertise and AI-assisted design.";
      } else if (cleanText.includes("reboot") || cleanText.includes("restart") || cleanText.includes("boot") || cleanText === "4") {
        reply = "SYS_REBOOT: Initializing system-wide hot reboot sequence. Click the refresh button at the bottom of the sidebar to initiate.";
      } else if (cleanText.includes("who are you") || cleanText.includes("your name") || cleanText.includes("what is your name") || cleanText.includes("identity") || cleanText.includes("bot")) {
        reply = "AGENT_ID: ADEEB_CORE_ASSIST v2.0. Created by operator Adeeb Ahammed K M to provide interactive interface telemetry.";
      } else if (cleanText.includes("help")) {
        reply = "AI_HELP: You can ask me anything about the operator. Telemetry index topics: 'skills', 'projects', 'education', 'internships', 'certifications', 'contact'.";
      } else {
        // Dynamic Contextual Fallback Generator
        const words = cleanText.replace(/[^\w\s]/g, "").split(" ").filter(w => w.length > 3);
        const randomWord = words.length > 0 ? words[Math.floor(Math.random() * words.length)].toUpperCase() : "QUERY";

        const fallbacks = [
          `INQUIRY_DECODED: Analyzing inquiry regarding "${randomWord}". Subsystem confirms operator Adeeb specializes in web development, application design, and customized Linux architectures.`,
          `TELEMETRY_LOG: Context node "${randomWord}" parsed. No errors detected. Adeeb has hands-on experience in full-stack engineering and cloud computing pipelines.`,
          `CORE_INTELLIGENCE: Sector lookup completed for "${randomWord}". Operator's expertise in Python, JavaScript, and React guarantees high-performance implementation.`,
          `RESPONSE_GEN: Processing "${randomWord}" context. The operator is open to freelance and remote roles. Connect directly via email: adeebahamedkm@gmail.com.`
        ];
        reply = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      }

      setChatMessages((prev) => [...prev, { sender: "bot", text: reply, timestamp }]);
      setIsBotTyping(false);
      addLog(`BOT: Response packet transmitted for query "${text.substring(0, 15)}..."`, "success");
    }, 800);
  };

  const handlePostComment = (e: FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    const newComment = {
      name: commentName.trim().toUpperCase().replace(/\s+/g, "_"),
      comment: commentText.trim(),
      color: commentColor,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem("adeeb_comments", JSON.stringify(updated));
    setCommentName("");
    setCommentText("");
    addLog(`DATABASE: Injected public memo from user ${newComment.name}.`, "success");
  };

  // Section Refs — no longer needed for scroll, kept for compile compat
  const profileRef = useRef<HTMLElement>(null);
  const coresRef = useRef<HTMLElement>(null);
  const creditsRef = useRef<HTMLElement>(null);
  const assetsRef = useRef<HTMLElement>(null);
  const terminalRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  void profileRef; void coresRef; void creditsRef; void assetsRef; void terminalRef; void contactRef;

  // Disable browser scroll restoration so page always starts at top
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  // Helper to add timestamped terminal logs dynamically
  const addLog = (
    text: string, 
    type: "system" | "kernel" | "user" | "success" | "warning" | "error" = "system"
  ) => {
    const timestamp = (performance.now() / 1000).toFixed(6);
    setLogs((prev) => [...prev, { timestamp, text, type }]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  // Local clock generator for the top right status bar
  const [topTime, setTopTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setTopTime(date.toUTCString().replace("GMT", "UTC"));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Periodic random console events in the main thread (lifted up from subcomponent)
  useEffect(() => {
    if (isBooting) return;

    const backgroundMessages = [
      "CRON: Syncing system database modules... [OK]",
      "HEURISTIC: Scanning incoming node requests... No threats detected.",
      "SYSTEM: Frame permission state idle. No camera/mic requests registered.",
      "NET: Port forwarding verified on port 3000.",
      "DAEMON: Interactive crosshair mouse coordinates calibrated.",
      "RESOURCE: CPU load 6.4%, thermal limit safe."
    ];

    const interval = setInterval(() => {
      const randMsg = backgroundMessages[Math.floor(Math.random() * backgroundMessages.length)];
      addLog(randMsg, "system");
    }, 14000);

    return () => clearInterval(interval);
  }, [isBooting]);

  // When boot finishes: always scroll to top and reset active tab to ROOT
  useEffect(() => {
    if (!isBooting) {
      // Clear any URL hash so browser doesn't jump to a section
      history.replaceState(null, '', window.location.pathname);
      // Force scroll to very top
      window.scrollTo({ top: 0, behavior: 'instant' });
      setActiveTab('root');
    }
  }, [isBooting]);

  // Scrollspy — uses getElementById to read section positions reliably
  useEffect(() => {
    if (isBooting) return;

    const sectionIds = [
      { id: "contact-section",  tab: "sys" },
      { id: "terminal-section", tab: "logs" },
      { id: "assets-section",   tab: "exec" },
      { id: "credits-section",  tab: "cred" },
      { id: "cores-section",    tab: "src" },
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY + 250;
      let found = "root";
      for (const { id, tab } of sectionIds) {
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop) {
          found = tab;
          break;
        }
      }
      setActiveTab(found);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isBooting]);

  // scrollToSection kept for API compatibility (sidebar now uses anchor links)
  const scrollToSection = (_targetId: string) => {
    // Navigation handled natively via anchor <a href="#id"> links
  };

  // Clipboard Handler
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    addLog(`CLIPBOARD: Cached ${label} payload to host keyboard.`, "success");
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Form submission handler
  const handleSubmitMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;

    setIsSending(true);
    addLog(`SMTP: Commencing transfer sequence for contact message payload...`, "warning");

    setTimeout(() => {
      setIsSending(false);
      setFormSubmitted(true);
      addLog(`SMTP: Packet successfully routed to Operator Adeeb. Secure socket closed.`, "success");
      setContactMessage("");
      setTimeout(() => setFormSubmitted(false), 5000);
    }, 2000);
  };

  // Core level visual segmented bar renderer
  const renderSegmentedBar = (percentage: number) => {
    const totalSegments = 10;
    const activeSegments = Math.round((percentage / 100) * totalSegments);
    return (
      <div className="flex gap-1 w-full my-3">
        {Array.from({ length: totalSegments }).map((_, idx) => {
          const isActive = idx < activeSegments;
          const isDangerZone = idx === 9; // Let's make the 10th segment orange as requested!
          return (
            <div
              key={idx}
              className={`h-4.5 flex-1 transition-all duration-300 ${
                isActive 
                  ? isDangerZone
                    ? "bg-[#bf00ff] border border-[#bf00ff] shadow-[0_0_8px_#bf00ff]"
                    : "bg-[#00ffff] border border-[#00ffff] shadow-[0_0_6px_#00ffff]"
                  : "bg-[#111111] border border-[#2a2a2a]"
              }`}
            />
          );
        })}
      </div>
    );
  };

  const handleTriggerReboot = () => {
    addLog("SYSTEM: Manual reboot request acknowledged. Shutting down terminal subsystems...", "warning");
    setTimeout(() => {
      setIsBooting(true);
    }, 600);
  };

  if (isBooting) {
    return <BIOSBootScreen onComplete={() => setIsBooting(false)} />;
  }

  return (
    <div className="min-h-screen bg-void text-[#e5e2e1] font-sans scanlines cyber-grid sm:pl-16 pb-14 sm:pb-0 selection:bg-[#bf00ff]/30 selection:text-white">
      {/* Custom Animated Cyber Tracking Cursor */}
      <CustomCursor />

      {/* Interactive Vertical Sidebar on the Left */}
      <NavigationSidebar 
        activeSection={activeTab} 
        onSectionSelect={scrollToSection} 
        onTriggerReboot={handleTriggerReboot} 
      />

      {/* Top Global Status Header */}
      <header className="sticky top-0 bg-[#050505]/95 border-b border-[#3a4a49] z-30 px-3 sm:px-6 py-2.5 flex justify-between items-center text-[10px] font-mono tracking-wider">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <span className="text-neon-cyan font-bold glow-cyan whitespace-nowrap">ADEEB_CORE_V2.0</span>
          <span className="bg-[#eaea00] text-[#1d1d00] font-bold px-1.5 py-0.5 clip-corner-sm hidden xs:inline">
            ROOT
          </span>
          <span className="text-gray-500 hidden md:inline">|</span>
          <span className="text-[#00ffcc] font-bold hidden md:inline">STATUS: OK</span>
          <span className="text-gray-500 hidden md:inline">|</span>
          <span className="text-[#b9cac9] hidden lg:inline">NET: 802.11AX</span>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4 text-gray-400 shrink-0">
          <span className="text-[9px] text-[#839493] hidden lg:inline font-bold">
            {topTime}
          </span>
          <div className="flex items-center gap-1.5 border border-[#3a4a49] px-2 py-0.5 bg-[#111111]">
            <Radio className="w-3 h-3 text-neon-cyan animate-pulse" />
            <span className="text-neon-cyan text-[8px] font-bold hidden sm:inline">SECURE_TUNNEL_ESTABLISHED</span>
            <span className="text-neon-cyan text-[8px] font-bold sm:hidden">SECURE</span>
          </div>
          <Settings className="w-3.5 h-3.5 hover:text-neon-orange hover:rotate-90 transition-transform duration-300 cursor-pointer" />
        </div>
      </header>

      {/* Main Content Stage */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 space-y-12 sm:space-y-16">
        
        {/* Section 1: Hero & Vital Stats Block */}
        <section 
          id="profile-section" 
          ref={profileRef}
          className="pt-4 scroll-mt-24"
        >
          {/* Top Divider orange line */}
          <div className="w-full h-1.5 bg-[#bf00ff] glow-orange mb-8"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Title Brand Layout */}
            <div className="lg:col-span-12 space-y-8">
              <div className="relative select-none flex flex-col brand-container">
                <h1 
                  data-text="ADEEB"
                  className="font-display text-[52px] xs:text-[64px] sm:text-[96px] md:text-[120px] leading-[0.85] tracking-tight uppercase m-0 glitter-text cursor-pointer select-all cyber-glitch"
                >
                  ADEEB
                </h1>
                <h1 
                  data-text="SYSTEMS"
                  className="font-display text-[52px] xs:text-[64px] sm:text-[96px] md:text-[120px] leading-[0.85] tracking-tight uppercase text-stroke-cyan m-0 hover:text-neon-cyan transition-all duration-300 cursor-pointer select-all cyber-glitch"
                >
                  SYSTEMS
                </h1>
                
                {/* Tech metadata overlay */}
                <div className="absolute top-0 right-0 border border-dashed border-neon-cyan/20 p-2 font-mono text-[8px] text-gray-600 hidden md:block">
                  [SYSTEM_LOC: IND_REGION_07]<br />
                  [NODE_IP: 192.168.1.101]<br />
                  [OS: ARCH_LINUX_MAXIMAL]
                </div>
              </div>

              {/* Vital Bio stats card */}
              <div className="border border-[#3a4a49] bg-[#111111] p-6 clip-corner relative group">
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-neon-cyan/10 border-b border-l border-[#3a4a49] flex items-center justify-center font-mono text-[10px] text-neon-cyan">
                  V
                </div>

                <div className="font-mono text-[9px] text-neon-yellow tracking-wider mb-2">
                  VITAL_STATS // ENCRYPTION: ACTIVE
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="font-sans text-2xl md:text-3xl font-bold tracking-tight text-[#e5e2e1] m-0">
                      ADEEB AHAMMED K M
                    </h2>
                    
                    <p className="font-sans text-sm leading-relaxed text-[#b9cac9] m-0">
                      Motivated Computer Science and Engineering undergraduate with hands-on experience in web development, application development, and AI-assisted software design. Proficient in building responsive web applications using Python, JavaScript, HTML, and CSS. Experienced in developing personal projects, leveraging AI tools to improve productivity, and customizing Linux environments. Seeking freelance and remote opportunities to deliver high-quality software solutions while expanding technical expertise.
                    </p>
                  </div>

                  {/* Two Column Grid for Education and Languages */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#3a4a49]/30">
                    {/* Academic Registry / Education */}
                    <div className="space-y-2">
                      <div className="font-mono text-[10px] text-neon-cyan uppercase tracking-wider flex items-center gap-1.5 font-bold">
                        <BookOpen className="w-3.5 h-3.5 text-neon-cyan animate-pulse" />
                        <span>ACADEMIC_REGISTRY</span>
                      </div>
                      {educationData.map((edu, idx) => (
                        <div key={idx} className="border border-[#2a3a39] bg-[#0a0a0a] p-3 font-mono text-[11px] leading-relaxed relative">
                          <div className="text-white font-bold mb-1">{edu.degree}</div>
                          <div className="text-gray-400">{edu.institution}</div>
                          <div className="text-gray-500 text-[10px]">{edu.university}</div>
                          <div className="text-gray-500 text-[10px]">{edu.location}</div>
                          <div className="flex justify-between mt-2 pt-2 border-t border-[#2a3a39]/30 font-bold text-[10px]">
                            <span className="text-neon-cyan">{edu.cgpa}</span>
                            <span className="text-neon-orange">{edu.graduationYear}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Language Transceivers */}
                    <div className="space-y-2">
                      <div className="font-mono text-[10px] text-neon-yellow uppercase tracking-wider flex items-center gap-1.5 font-bold">
                        <Globe className="w-3.5 h-3.5 text-neon-yellow" />
                        <span>LANGUAGE_TRANSCEIVERS</span>
                      </div>
                      <div className="border border-[#2a3a39] bg-[#0a0a0a] p-3 space-y-3">
                        {languagesData.map((lang, idx) => (
                          <div key={idx} className="flex justify-between items-center font-mono text-[11px]">
                            <span className="text-white font-bold">{lang.name}</span>
                            <span className="text-neon-cyan text-[10px] font-semibold border border-neon-cyan/20 px-1.5 py-0.5 bg-neon-cyan/5">
                              {lang.fluency}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 font-mono text-xs pt-2">
                    {/* Get CV Button */}
                    <a 
                      href={`${import.meta.env.BASE_URL}cv.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        addLog("USER: Triggering system CV print and download module.", "user");
                      }}
                      className="px-4 py-2 bg-neon-cyan hover:bg-[#00ffff]/80 text-black font-bold uppercase transition-all duration-300 flex items-center gap-1.5 clip-corner-sm cursor-pointer shadow-[0_0_10px_rgba(0,255,255,0.2)] font-semibold no-underline"
                    >
                      <Download className="w-3.5 h-3.5" />
                      GET_CV.PDF
                    </a>

                    {/* Reboot Button */}
                    <button 
                      onClick={handleTriggerReboot}
                      className="px-4 py-2 border border-neon-orange text-neon-orange hover:bg-neon-orange/10 hover:text-white font-bold uppercase transition-all duration-300 flex items-center gap-1.5 clip-corner-sm cursor-pointer font-semibold"
                    >
                      <Terminal className="w-3.5 h-3.5 animate-pulse" />
                      INIT_SEQUENCE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Technical Cores Skills Grid */}
        <section 
          id="cores-section" 
          ref={coresRef}
          className="scroll-mt-24"
        >
          {/* Header divider */}
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-display text-2xl tracking-wider text-neon-orange uppercase glow-orange whitespace-nowrap m-0">
              TECHNICAL_CORES
            </h2>
            <div className="flex-1 h-0.5 border-t border-dashed border-[#bf00ff]/30"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {technicalCores.map((core) => (
              <div 
                key={core.id} 
                className="border border-[#3a4a49] bg-[#111111] p-5 relative overflow-hidden group hover:border-neon-cyan transition-colors duration-300"
              >
                {/* Absolute ID Label in card */}
                <div className="absolute top-0 right-0 bg-[#161616] border-b border-l border-[#3a4a49] px-2 py-0.5 font-mono text-[8px] text-gray-500">
                  {core.coreId}
                </div>

                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-display text-xl tracking-wider text-white m-0 uppercase group-hover:text-neon-cyan transition-colors">
                    {core.name}
                  </h3>
                  <span className="font-mono text-xs font-bold text-neon-cyan">
                    {core.percentage}%
                  </span>
                </div>

                {/* Segmented meter block */}
                {renderSegmentedBar(core.percentage)}

                <div className="mt-4 font-mono text-[9px] text-gray-500 leading-none">
                  <span className="text-neon-yellow">SUBROUTINES: </span>
                  <span className="text-gray-400 font-bold">{core.subroutines.join(" / ")}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Credentials Registry & Active Internships */}
        <section 
          id="credits-section" 
          ref={creditsRef}
          className="scroll-mt-24"
        >
          {/* Header Divider */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4 flex-1">
              <h2 className="font-display text-2xl tracking-wider text-neon-yellow uppercase glow-yellow whitespace-nowrap m-0">
                CREDENTIAL_REGISTRY
              </h2>
              <div className="flex-1 h-0.5 border-t border-dashed border-neon-yellow/30"></div>
            </div>
            
            <div className="ml-4 bg-[#bf00ff]/10 border border-[#bf00ff]/30 px-2.5 py-1 font-mono text-[9px] font-bold text-neon-orange tracking-wider clip-corner-sm">
              REG_STATUS: SECURE
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Experience / Internship Panel */}
            <div className="lg:col-span-6 space-y-6">
              <div className="font-mono text-[10px] text-neon-cyan uppercase tracking-widest flex items-center gap-2 font-bold mb-2">
                <span>//</span>
                <span>SYSTEM_DAEMONS (ACTIVE_INTERNSHIPS)</span>
              </div>

              {internshipsData.map((intern) => (
                <div 
                  key={intern.id}
                  className="border border-[#3a4a49] bg-[#111111] p-6 relative overflow-hidden group hover:border-neon-cyan transition-all duration-300"
                >
                  {/* Status Indicator */}
                  <div className="absolute top-0 right-0 bg-neon-cyan/10 border-b border-l border-[#3a4a49] px-2 py-0.5 font-mono text-[8px] text-neon-cyan font-bold animate-pulse">
                    {intern.status}
                  </div>

                  <div className="mb-4">
                    <h3 className="font-display text-xl text-white tracking-wide uppercase m-0 group-hover:text-neon-cyan transition-colors">
                      {intern.role}
                    </h3>
                    <div className="font-mono text-[10px] text-gray-500 mt-1 flex justify-between">
                      <span>{intern.company} ({intern.location})</span>
                      <span className="text-neon-yellow font-bold">{intern.duration}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 font-sans text-xs text-[#b9cac9] list-none p-0 m-0">
                    {intern.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <span className="text-neon-cyan mt-0.5 font-bold">➜</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Certifications Panel */}
            <div className="lg:col-span-6 space-y-6">
              <div className="font-mono text-[10px] text-neon-orange uppercase tracking-widest flex items-center gap-2 font-bold mb-2">
                <span>//</span>
                <span>VERIFIED_CERTIFICATES</span>
              </div>

              <div className="border border-[#3a4a49] bg-[#111111] p-6 space-y-4">
                {certificationsData.map((cert, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between border border-[#2a3a39] bg-[#0c0c0c] p-3 hover:border-neon-orange transition-colors duration-200"
                  >
                    <div className="space-y-1">
                      <div className="font-mono text-xs text-white font-bold">{cert.name}</div>
                      <div className="font-mono text-[9px] text-gray-500">PROVIDER: {cert.provider}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 font-mono text-[8px]">
                      <span className="text-neon-cyan font-bold tracking-widest border border-neon-cyan/20 px-1.5 py-0.5 bg-neon-cyan/5">
                        [VERIFIED]
                      </span>
                      <span className="text-gray-600 font-semibold">{cert.idCode}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Operational Assets Portfolio (Alternate Layouts) */}
        <section 
          id="assets-section" 
          ref={assetsRef}
          className="scroll-mt-24"
        >
          {/* Header Divider */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4 flex-1">
              <h2 className="font-display text-2xl tracking-wider text-neon-cyan uppercase glow-cyan whitespace-nowrap m-0">
                PROJECTS
              </h2>
              <div className="flex-1 h-0.5 border-t border-dashed border-neon-cyan/30"></div>
            </div>
            
            <div className="ml-4 bg-neon-orange/10 border border-neon-orange/30 px-2.5 py-1 font-mono text-[9px] font-bold text-neon-orange tracking-wider clip-corner-sm">
              TOTAL_RECORDS: 03
            </div>
          </div>

          {/* Alternate Project List items */}
          <div className="space-y-12">
            {operationalAssets.map((asset, index) => {
              const hasImage = !!asset.imagePath;
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={asset.id}
                  className="border border-[#3a4a49] bg-[#111111] grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden group hover:border-neon-cyan transition-all duration-300"
                >
                  {/* Image Panel */}
                  {hasImage && (
                    <div className={`md:col-span-5 h-[260px] md:h-auto overflow-hidden relative border-[#3a4a49] ${isEven ? "md:order-1 md:border-r" : "md:order-2 md:border-l"}`}>
                      <img 
                        src={asset.imagePath} 
                        alt={asset.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                      />
                      
                      {/* Floating Corner coordinates in image */}
                      <div className="absolute top-2 left-2 bg-[#050505]/80 px-1.5 py-0.5 font-mono text-[8px] text-neon-cyan select-none border border-neon-cyan/20">
                        [SEC: {asset.label}]
                      </div>
                    </div>
                  )}

                  {/* Metadata Text Panel */}
                  <div className={`${hasImage ? "md:col-span-7" : "md:col-span-12"} p-6 flex flex-col justify-between ${hasImage ? (isEven ? "md:order-2" : "md:order-1") : ""}`}>
                    <div>
                      {/* Top labels */}
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-mono text-[9px] font-bold text-neon-orange tracking-wider uppercase">
                          {asset.label}
                        </span>
                        <span className="font-mono text-[9px] text-gray-500">
                          [{asset.securityLevel}]
                        </span>
                      </div>

                      <h3 className="font-display text-2xl tracking-wide uppercase text-white mb-3 group-hover:text-neon-cyan transition-colors">
                        {asset.title}
                      </h3>

                      <p className="font-sans text-sm text-[#b9cac9] leading-relaxed mb-6">
                        {asset.description}
                      </p>
                    </div>

                    {/* Bottom badging and CTA button */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#3a4a49]/30 pt-4">
                      {/* Badges */}
                      <div className="flex flex-wrap gap-1.5 font-mono text-[9px]">
                        {asset.badges.map((badge, bIdx) => (
                          <span 
                            key={bIdx} 
                            className="bg-[#181818] border border-[#3a4a49] px-2 py-0.5 text-gray-400 font-bold tracking-wider"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>

                      {/* CTA link with copy utility if clone, otherwise link */}
                      {asset.actionType === "clone" ? (
                        <button
                          onClick={() => copyToClipboard(asset.actionTarget, "Git Clone command")}
                          className="px-3.5 py-1.5 bg-[#1a1a1a] hover:bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 hover:border-neon-cyan text-[10px] font-mono font-bold uppercase transition-all duration-200 cursor-pointer clip-corner-sm flex items-center gap-1.5"
                        >
                          {copiedText === "Git Clone command" ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#00ffcc]" />
                              COPIED_SECURE
                            </>
                          ) : (
                            <>
                              <Terminal className="w-3.5 h-3.5" />
                              {asset.actionText}
                            </>
                          )}
                        </button>
                      ) : (
                        <a 
                          href={asset.actionTarget}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => addLog(`LINK: Directing node to operational target: ${asset.title}`, "success")}
                          className="px-3.5 py-1.5 bg-[#1a1a1a] hover:bg-neon-cyan hover:text-black text-neon-cyan border border-neon-cyan/30 hover:border-neon-cyan text-[10px] font-mono font-bold uppercase transition-all duration-200 clip-corner-sm flex items-center gap-1.5"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          {asset.actionText}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 4: Live Core CLI / System Terminal */}
        <section 
          id="terminal-section" 
          ref={terminalRef}
          className="scroll-mt-24"
        >
          {/* Header divider */}
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-display text-2xl tracking-wider text-neon-orange uppercase glow-orange whitespace-nowrap m-0">
              CORE_OS_TELEMETRY
            </h2>
            <div className="flex-1 h-0.5 border-t border-dashed border-[#bf00ff]/30"></div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="h-[380px] md:h-[450px]">
              <BootLogTerminal 
                logs={logs} 
                onAddLog={addLog} 
                onClearLogs={clearLogs} 
              />
            </div>
          </div>
        </section>

        {/* Section 5: Contact payload transmission */}
        <section 
          id="contact-section" 
          ref={contactRef}
          className="scroll-mt-24 relative pb-16"
        >
          {/* Header divider */}
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-display text-2xl tracking-wider text-neon-orange uppercase glow-orange whitespace-nowrap m-0">
              INITIATE_CONTACT
            </h2>
            <div className="flex-1 h-0.5 border-t border-dashed border-[#bf00ff]/30"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
            {/* // CHANNELS Section */}
            <div className="lg:col-span-7 flex flex-col justify-start">
              <div className="font-mono text-[10px] text-neon-cyan uppercase tracking-widest mb-4 flex items-center gap-1.5 font-bold">
                <span>//</span>
                <span>CHANNELS</span>
              </div>
              <div className="border-t border-white/10">
                {channels.map((channel) => (
                  <a 
                    key={channel.name}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => addLog(`NAVIGATING: Opening communication link to ${channel.name}.`, "user")}
                    className="flex items-end justify-between py-5 border-b border-white/10 group cursor-pointer transition-colors hover:border-neon-cyan"
                  >
                    <span className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase text-white group-hover:text-neon-cyan transition-colors duration-300 break-all">
                      {channel.name}
                    </span>
                    <div className="flex items-center gap-2 sm:gap-4 pb-1 sm:pb-2 shrink-0">
                      <span className="font-mono text-[9px] sm:text-[10px] md:text-xs text-gray-500 group-hover:text-white transition-colors duration-300 select-all hidden sm:block">
                        {channel.value}
                      </span>
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-hover:text-neon-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
            {/* Multi-Tab Communication Console */}
            <div className="lg:col-span-5 border border-neon-orange/30 bg-[#111111] relative flex flex-col clip-corner min-h-[380px]">
              {/* Tab Selector header */}
              <div className="flex border-b border-[#3a4a49] bg-[#0a0a0a] text-[10px] font-mono select-none">
                <button
                  type="button"
                  onClick={() => {
                    setContactTab("transmit");
                    addLog("VIRTUAL_CONSOLE: Switched channel to DIRECT_TRANSMIT.", "system");
                  }}
                  className={`flex-1 py-2 text-center border-r border-[#3a4a49] transition-all font-bold cursor-pointer ${
                    contactTab === "transmit" ? "text-neon-cyan bg-[#111111]" : "text-gray-500 hover:text-white"
                  }`}
                >
                  [01] TRANSMIT
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setContactTab("chatbot");
                    addLog("VIRTUAL_CONSOLE: Initializing local AI_ASSISTANT connection.", "system");
                  }}
                  className={`flex-1 py-2 text-center border-r border-[#3a4a49] transition-all font-bold cursor-pointer ${
                    contactTab === "chatbot" ? "text-[#bf00ff] bg-[#111111]" : "text-gray-500 hover:text-white"
                  }`}
                >
                  [02] AI_ASSIST
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setContactTab("comments");
                    addLog("VIRTUAL_CONSOLE: Fetching memo records from active database.", "system");
                  }}
                  className={`flex-1 py-2 text-center transition-all font-bold cursor-pointer ${
                    contactTab === "comments" ? "text-neon-yellow bg-[#111111]" : "text-gray-500 hover:text-white"
                  }`}
                >
                  [03] MEMO_WALL
                </button>
              </div>

              {/* Tab 1: TRANSMIT */}
              {contactTab === "transmit" && (
                <form onSubmit={handleSubmitMessage} className="p-5 flex flex-col gap-4 flex-1 justify-between">
                  <div>
                    <div className="font-mono text-[9px] text-neon-yellow tracking-wider mb-2 uppercase select-none">
                      DIRECT_ENVELOPE_TRANSMISSION // BINDING: PORT_3000
                    </div>
                    <div className="relative">
                      <textarea
                        required
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        rows={6}
                        placeholder="Type your inquiry or message payload here..."
                        className="w-full bg-[#0a0a0a] border border-[#3a4a49] focus:border-neon-orange outline-none p-4 font-mono text-sm text-[#ffffff] focus:ring-0 placeholder-gray-700 resize-none"
                      />
                      <div className="absolute top-2 right-2 font-mono text-[8px] text-gray-600 uppercase select-none pointer-events-none">
                        [PKT_LEN: {contactMessage.length} B]
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSending || formSubmitted}
                    className={`w-full font-display text-lg tracking-wider py-3 uppercase flex items-center justify-center gap-2 transition-all duration-300 clip-corner-sm cursor-pointer ${
                      formSubmitted
                        ? "bg-[#00ffcc] text-black font-bold border border-[#00ffcc]"
                        : "bg-[#bf00ff] hover:bg-white text-black font-bold shadow-[0_0_12px_rgba(191,0,255,0.2)]"
                    }`}
                  >
                    {isSending ? (
                      <>
                        <span className="animate-spin">⚙</span>
                        ROUTING_PACKETS...
                      </>
                    ) : formSubmitted ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        TRANSMISSION_COMPLETE
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        TRANSMIT_PACKET
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Tab 2: AI_ASSISTANT Chat Bot */}
              {contactTab === "chatbot" && (
                <div className="p-5 flex flex-col justify-between flex-1 min-h-[350px]">
                  {/* Chat messages stream */}
                  <div ref={chatContainerRef} className="flex-1 overflow-y-auto max-h-[220px] mb-4 space-y-3 pr-1 scrollbar-thin">
                    {chatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex items-start gap-2 text-[10px] font-mono ${
                          msg.sender === "user" ? "justify-end text-right" : "justify-start text-left"
                        }`}
                      >
                        {msg.sender === "bot" && (
                          <div className="w-6 h-6 rounded-full border border-[#bf00ff]/50 bg-[#bf00ff]/10 flex items-center justify-center text-[#bf00ff] shrink-0">
                            <Bot className="w-3 h-3" />
                          </div>
                        )}
                        <div className="max-w-[80%]">
                          <div
                            className={`p-2.5 rounded border ${
                              msg.sender === "user"
                                ? "bg-neon-cyan/5 border-neon-cyan/30 text-neon-cyan"
                                : "bg-neutral-900 border-[#3a4a49] text-gray-300"
                            }`}
                          >
                            {msg.text}
                          </div>
                          <span className="text-[7px] text-gray-600 block mt-1">
                            {msg.timestamp}
                          </span>
                        </div>
                        {msg.sender === "user" && (
                          <div className="w-6 h-6 rounded-full border border-neon-cyan/50 bg-neon-cyan/10 flex items-center justify-center text-neon-cyan shrink-0">
                            <User className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                    ))}
                    {isBotTyping && (
                      <div className="flex items-center gap-2 text-[9px] text-[#bf00ff] font-mono">
                        <span className="animate-pulse">●</span>
                        <span>AI_CORE IS GENERATING RESPONSE...</span>
                      </div>
                    )}
                  </div>

                  {/* Hotkeys Suggestions */}
                  <div className="flex flex-wrap gap-1.5 mb-3 select-none">
                    <button
                      type="button"
                      onClick={() => handleSendChatMessage(undefined, "1")}
                      className="px-2 py-0.5 border border-[#bf00ff]/30 hover:border-[#bf00ff] hover:bg-[#bf00ff]/10 text-gray-400 hover:text-white font-mono text-[8px] transition-all cursor-pointer"
                    >
                      [1] WHO_IS_ADEEB?
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSendChatMessage(undefined, "2")}
                      className="px-2 py-0.5 border border-[#bf00ff]/30 hover:border-[#bf00ff] hover:bg-[#bf00ff]/10 text-gray-400 hover:text-white font-mono text-[8px] transition-all cursor-pointer"
                    >
                      [2] GET_SKILLS
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSendChatMessage(undefined, "3")}
                      className="px-2 py-0.5 border border-[#bf00ff]/30 hover:border-[#bf00ff] hover:bg-[#bf00ff]/10 text-gray-400 hover:text-white font-mono text-[8px] transition-all cursor-pointer"
                    >
                      [3] DIRECT_CONTACT
                    </button>
                  </div>

                  {/* Message Input Form */}
                  <form onSubmit={handleSendChatMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask the AI agent anything..."
                      className="flex-1 bg-[#0a0a0a] border border-[#3a4a49] focus:border-[#bf00ff] outline-none px-3 py-2 font-mono text-xs text-white focus:ring-0 placeholder-gray-700"
                    />
                    <button
                      type="submit"
                      className="bg-[#bf00ff] hover:bg-[#bf00ff]/80 text-black font-display font-bold text-xs px-4 py-2 uppercase transition-all cursor-pointer"
                    >
                      SEND
                    </button>
                  </form>
                </div>
              )}

              {/* Tab 3: MEMO_WALL (Comment Board) */}
              {contactTab === "comments" && (
                <div className="p-5 flex flex-col justify-between flex-1 min-h-[350px]">
                  {/* Local comments feed list */}
                  <div className="flex-1 overflow-y-auto max-h-[170px] mb-4 space-y-3.5 pr-1 scrollbar-thin">
                    {comments.length === 0 ? (
                      <div className="text-center font-mono text-[10px] text-gray-600 py-6">
                        // NO MEMO RECORDS CURRENTLY LOGGED
                      </div>
                    ) : (
                      comments.map((c, idx) => (
                        <div key={idx} className="border-l-2 border-[#bf00ff]/40 pl-3 py-1 font-mono text-[10px] space-y-1">
                          <div className="flex justify-between items-center text-[8px]">
                            <span className={`${c.color} font-bold`}>@{c.name}</span>
                            <span className="text-gray-600">{c.timestamp}</span>
                          </div>
                          <p className="text-gray-300 leading-relaxed break-words">{c.comment}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Post comment form */}
                  <form onSubmit={handlePostComment} className="border-t border-[#3a4a49]/50 pt-3 space-y-2.5">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        required
                        type="text"
                        value={commentName}
                        onChange={(e) => setCommentName(e.target.value)}
                        placeholder="OPERATOR_TAG..."
                        maxLength={15}
                        className="bg-[#0a0a0a] border border-[#3a4a49] focus:border-neon-yellow outline-none px-2 py-1.5 font-mono text-[10px] text-white focus:ring-0 placeholder-gray-700 uppercase"
                      />
                      {/* Color Scheme Picker */}
                      <div className="flex items-center justify-around border border-[#3a4a49] bg-[#0a0a0a] px-2 py-1 select-none">
                        <button
                          type="button"
                          onClick={() => setCommentColor("text-neon-cyan")}
                          className={`w-3.5 h-3.5 bg-neon-cyan border transition-transform ${
                            commentColor === "text-neon-cyan" ? "scale-125 border-white" : "border-transparent opacity-60"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setCommentColor("text-neon-yellow")}
                          className={`w-3.5 h-3.5 bg-neon-yellow border transition-transform ${
                            commentColor === "text-neon-yellow" ? "scale-125 border-white" : "border-transparent opacity-60"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setCommentColor("text-[#bf00ff]")}
                          className={`w-3.5 h-3.5 bg-[#bf00ff] border transition-transform ${
                            commentColor === "text-[#bf00ff]" ? "scale-125 border-white" : "border-transparent opacity-60"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <input
                        required
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write public comment record..."
                        maxLength={100}
                        className="flex-1 bg-[#0a0a0a] border border-[#3a4a49] focus:border-neon-yellow outline-none px-3 py-1.5 font-mono text-[10px] text-white focus:ring-0 placeholder-gray-700"
                      />
                      <button
                        type="submit"
                        className="bg-neon-yellow hover:bg-neon-yellow/80 text-black font-display font-bold text-xs px-3 py-1.5 uppercase transition-all cursor-pointer"
                      >
                        POST
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Large decorative outlined watermark behind in absolute layer */}
          <div className="absolute -bottom-8 right-0 text-[110px] sm:text-[180px] md:text-[220px] font-display text-white/[0.02] tracking-widest leading-none select-none pointer-events-none uppercase font-bold text-right w-full text-stroke-cyan/5">
            ADEEB
          </div>
        </section>
      </main>

      {/* Global Bottom Status Footer Bar */}
      <footer className="bg-[#0a0a0a] border-t border-[#3a4a49] py-5 text-[9px] font-mono text-gray-400 text-center select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-4">
          <div className="text-gray-500 text-center text-[8px] sm:text-[9px]">
            ADEEB_CORE_OS © {new Date().getFullYear()} // ROOT: 0.0.0.0 // TANUR, KERALA, INDIA. ALL SUB-SYSTEMS OPERATIONAL.
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 font-bold text-[9px] sm:text-[10px]">
            <a 
              href="mailto:adeebahamedkm@gmail.com" 
              className="text-neon-cyan hover:text-white transition-colors duration-200 flex items-center gap-1.5 hover:glow-cyan"
            >
              <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">EMAIL://</span>adeebahamedkm@gmail.com
            </a>
            <a 
              href="tel:+919037340138" 
              className="text-[#00ffcc] hover:text-white transition-colors duration-200 flex items-center gap-1.5 hover:glow-cyan"
            >
              <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">PHONE://</span>+919037340138
            </a>
             <a 
              href="https://www.linkedin.com/in/adeeb-ahammed-km-799b0a33b?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neon-cyan hover:text-white transition-colors duration-200 flex items-center gap-1.5 hover:glow-cyan"
            >
              <Linkedin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              LINKEDIN
            </a>
            <a 
              href="https://www.instagram.com/adeeeb____?igsh=MTRrYW43MTFpNzZrYQ==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neon-orange hover:text-white transition-colors duration-200 flex items-center gap-1.5 hover:glow-orange"
            >
              <Instagram className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              INSTAGRAM
            </a>
            <a 
              href="https://github.com/darkworld1008" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-neon-cyan transition-colors duration-200 flex items-center gap-1.5"
            >
              <span>💻</span>
              GITHUB
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
