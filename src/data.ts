import { TechnicalCore, OperationalAsset, ConsoleLine, EducationDetail, LanguageDetail, InternshipDetail, CertificationDetail } from "./types";

export const technicalCores: TechnicalCore[] = [
  {
    id: "python",
    name: "PYTHON",
    percentage: 95,
    subroutines: ["DJANGO", "FASTAPI", "AUTOMATION"],
    coreId: "PYTHON_X64"
  },
  {
    id: "javascript",
    name: "JAVASCRIPT",
    percentage: 88,
    subroutines: ["REACT.JS", "NODE.JS", "HTML5 / CSS3"],
    coreId: "JS_RUNTIME"
  },
  {
    id: "c_cpp",
    name: "C / C++",
    percentage: 82,
    subroutines: ["STL", "SYSTEM_PROGRAMMING", "DATA_STRUCTURES"],
    coreId: "CPP_COMPILER"
  },
  {
    id: "linux",
    name: "LINUX",
    percentage: 92,
    subroutines: ["BASH", "SYSTEMS_CUSTOMIZATION", "AI_DEV_TOOLS"],
    coreId: "KERNEL_MOD"
  }
];

export const operationalAssets: OperationalAsset[] = [
  {
    id: "loomi_website",
    label: "PROJECT_ALPHA",
    securityLevel: "SEC_LVL: UNRESTRICTED",
    title: "LOOMI_WEBSITE",
    description: "Designed and developed a responsive website with a modern user interface and payment integration capabilities. Implemented mobile-friendly layouts and optimized usability across multiple devices while utilizing AI-assisted development tools to improve design efficiency and workflow.",
    badges: ["REACT.JS", "HTML5/CSS3", "TAILWIND", "PAYMENTS"],
    imagePath: "",
    actionText: "ACCESS_URL",
    actionType: "url",
    actionTarget: "https://loomi-in.onrender.com"
  },
  {
    id: "mobile_app",
    label: "MOBILE_EXPANSION",
    securityLevel: "STATUS: DEVELOPMENT",
    title: "MOBILE_APPLICATION",
    description: "Developing a mobile application with a focus on usability, performance, and user experience. Applying modern software development principles to design and implement application features.",
    badges: ["MOBILE", "UX/UI", "FLUTTER", "FIREBASE"],
    imagePath: "",
    actionText: "PREVIEW_SOURCE",
    actionType: "url",
    actionTarget: "https://github.com/darkworld1008"
  },
  {
    id: "linux_customization",
    label: "KERNEL_LAYER",
    securityLevel: "STATUS: OPTIMIZED",
    title: "LINUX_CUSTOMIZATION",
    description: "Customized Linux environments and system configurations to improve productivity and enhance user experience. Explored system administration concepts, custom terminal environments, and open-source technologies.",
    badges: ["BASH", "ZSH", "LINUX", "AI_TOOLS"],
    imagePath: "",
    actionText: "CLONE_REPO",
    actionType: "clone",
    actionTarget: "git clone https://github.com/darkworld1008/dotfiles.git"
  }
];

export const educationData: EducationDetail[] = [
  {
    degree: "Bachelor of Technology (B.Tech) in Computer Science and Engineering",
    institution: "KMCT Institute of Technology and Management",
    university: "APJ Abdul Kalam Technological University (KTU)",
    location: "Kuttippuram, Kerala, India",
    graduationYear: "Expected Graduation: 2028",
    cgpa: "Current CGPA: 7.0/10"
  }
];

export const languagesData: LanguageDetail[] = [
  { name: "ENGLISH", fluency: "FULL_PROFICIENCY" },
  { name: "MALAYALAM", fluency: "NATIVE_OR_BILINGUAL" },
  { name: "HINDI", fluency: "PROFICIENT" }
];

export const internshipsData: InternshipDetail[] = [
  {
    id: "cloud_intern",
    role: "Cloud Computing Intern",
    company: "Internship Program",
    location: "Remote",
    duration: "ONGOING",
    status: "ACTIVE_SERVICE",
    bullets: [
      "Gaining practical knowledge of cloud computing concepts, deployment methodologies, and cloud-based technologies.",
      "Developing an understanding of cloud infrastructure and modern computing environments."
    ]
  }
];

export const certificationsData: CertificationDetail[] = [
  { name: "Microsoft Certification Programs", provider: "Microsoft", idCode: "MS-CRED" },
  { name: "Foundation of Coding", provider: "Coursera", idCode: "COURSERA-FOC" },
  { name: "Full Stack Development Certifications", provider: "Multiple Institutions", idCode: "FSD-CRED" },
  { name: "Additional Certifications in Programming & Tech-related courses", provider: "Various Providers", idCode: "VAR-CERT" }
];

export const initialBootLogs: ConsoleLine[] = [
  { timestamp: "0.000000", text: "Linux version 6.15.0-76-generic (gcc version 12.2.0)", type: "system" },
  { timestamp: "0.000050", text: "Command line: BOOT_IMAGE=/vmlinuz-6.15-adeeb_core root=UUID=7f18-d730-4e3a", type: "system" },
  { timestamp: "0.000100", text: "KERNEL: Initializing system resources...", type: "kernel" },
  { timestamp: "0.000451", text: "PCI: Using configuration type 1 for base access", type: "kernel" },
  { timestamp: "0.002301", text: "Memory: 16326120k/16777216k available", type: "kernel" },
  { timestamp: "0.003201", text: "ACPI: Core revision 20250531", type: "system" },
  { timestamp: "0.112361", text: "USB: New high-speed USB device number 1", type: "kernel" },
  { timestamp: "0.150000", text: "SECURE_BOOT: Verification keys loaded successfully", type: "success" },
  { timestamp: "0.189421", text: "DEVICES: Initializing display adapters [DRM:AMDGPU]", type: "system" },
  { timestamp: "0.210452", text: "DEVICES: CRT terminal display synchronization on /dev/tty0", type: "success" },
  { timestamp: "0.320199", text: "NET: Interface eth0 up - DHCP lease acquired", type: "success" },
  { timestamp: "0.450000", text: "NET: Active bandwidth nodes verified on 802.11AX", type: "success" },
  { timestamp: "0.520410", text: "ENCRYPTION: Initializing AES-256 hardware accelerated modules", type: "kernel" },
  { timestamp: "0.589110", text: "ENCRYPTION: Core keys secure [KERALA_INDIA_REGION_07]", type: "success" },
  { timestamp: "0.620194", text: "OPERATOR: Validated signature ID: 10101 (Adeeb Ahammed K M)", type: "user" },
  { timestamp: "0.710042", text: "SYSTEM: Loading graphical desktop components...", type: "system" },
  { timestamp: "0.801290", text: "SYSTEM: Mounting operational assets at /var/www/loomi", type: "system" },
  { timestamp: "0.892019", text: "SYSTEM: Synchronizing dotfile packages at /home/adeeb/.config", type: "system" },
  { timestamp: "1.020491", text: "SYSTEM: Launching terminal dashboard (v2.0-core)...", type: "success" },
  { timestamp: "1.050000", text: "STATUS: Operational status set to PEAK PERFORMANCE", type: "success" }
];
