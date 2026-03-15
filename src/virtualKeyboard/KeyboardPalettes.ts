export const keyboardThemes = {
  defaultMode: {
    name: "Varsayılan Mod",
    shell: "bg-[#445A88]",
    keyBg: "bg-[#DDE2EE]",
    keyText: "text-[#020617]",
    actKeyBg: "bg-[#778DBB]",
    actKeyText: "text-white",
    actKeyBorder: "border-sky-400/20 shadow-sm shadow-sky-400/20",
  },
  sutlac: {
    name: "Sütlaç",
    shell: "bg-[#FFF4E6]",
    keyBg: "bg-[#ffffff] border-[#E0CFC0]",
    keyText: "text-[#3B1D0F]",
    actKeyBg: "bg-[#E2BFA9]",
    actKeyText: "text-white",
    actKeyBorder: "border-[#DABFAE]",
  },
  yanikSutlac: {
    name: "Yanık Sütlaç",
    shell: "bg-[#0A0A0B]",
    keyBg: "bg-[#1A1A1C] border-[#2D241F]",
    keyText: "text-[#F5EEE6]",
    actKeyBg: "bg-[#8B4513]",
    actKeyText: "text-white",
    actKeyBorder: "border-[#A0522D]",
  },
  laleDevri: {
    name: "Lale Devri",
    shell: "bg-[#B91C1C]",
    keyBg: "bg-[#FFF3E0]",
    keyText: "text-[#3B1D0F]",
    actKeyBg: "bg-[#991B1B]",
    actKeyText: "text-[#FFD700]",
    actKeyBorder: "border-[#FFD700]",
  },
  turkKahvesi: {
    name: "Türk Kahvesi",
    shell: "bg-[#654321]",
    keyBg: "bg-[#F5E6D3] border-[#ccb69b]",
    keyText: "text-[#3B2A1A]",
    actKeyBg: "bg-[#4A2C1A]",
    actKeyText: "text-white",
    actKeyBorder: "border-[#C8A27A]",
  },
  antepFistik: {
    name: "Antep Fıstığı",
    shell: "bg-[#93C572]",
    keyBg: "bg-[#F5F1E6] border-[#6B8E23]",
    keyText: "text-[#3A4A2B]",
    actKeyBg: "bg-[#7eb35b]",
    actKeyText: "text-white",
    actKeyBorder: "border-[#B6D7A8]",
  },
  kapadokya: {
    name: "Kapadokya",
    shell: "bg-[#C05621]",
    keyBg: "bg-[#F5E1C8] border-[#C9A27A]",
    keyText: "text-[#3B1D0F]",
    actKeyBg: "bg-[#F59E0B]",
    actKeyText: "text-white",
    actKeyBorder: "border-[#E7B98C]",
  },
  ispartaGulu: {
    name: "Isparta Gülü",
    shell: "bg-[#f8b5c4]",
    keyBg: "bg-[#FFF1F2] border-[#e08d9f]",
    keyText: "text-[#020617]",
    actKeyBg: "bg-[#BE185D]",
    actKeyText: "text-white",
    actKeyBorder: "border-[#c86b83]",
  },
  egeMavisi: {
    name: "Ege Mavisi",
    shell: "bg-[#7FB3D5]",
    keyBg: "bg-[#ffffff] border-[#5d8fb0]",
    keyText: "text-[#020617]",
    actKeyBg: "bg-[#437ba3]",
    actKeyText: "text-white",
    actKeyBorder: "border-[#5B93BA]",
  },
} as const;

export type KeyboardTheme = keyof typeof keyboardThemes;

export const isKeyboardTheme = (value: string): value is KeyboardTheme => {
  return value in keyboardThemes;
};

/*
 keyboard color pallets
  kestane: {
  name: "Kestane",
  shell: "bg-[#8B5E3C]",        // koyu sütlü kahve
  keyBg: "bg-[#A67C58]",        // açık kahve tuşlar
  keyText: "text-[#FFF4E6]",    // pastel krem / okunabilir
  actKeyBg: "bg-[#5C3A21]",     // aktif koyu tuş
  actKeyText: "text-[#FFF4E6]",
  actKeyBorder: "border border-[#A67C58]"
},
arctic blue -
top: bg-[#020617]
keys: bg-[#EFF6FF] text-[#020617]
enter/delete: bg-[#3B82F6] text-white
shadow: shadow-[0_2px_5px_rgba(0,0,0,0.12)]

 dark mode - bg-[#020617] (top div), bg-[#F1F5F9] text-[#020617] (keys), bg-[#020617] text-white (enter and delete)
 soft dark - bg-[#0F172A] (top div), bg-[#F8FAFC] text-[#0F172A] (keys), bg-[#2563EB] text-white (enter and delete)
 Slate Minimal - bg-slate-900 (top div), bg-slate-50 text-slate-900 (keys), bg-blue-600 text-white (enter and delete) border border-slate-200
 night mode - bg-gray-800 (top div), bg-gray-700 text-gray-100 (keys), bg-indigo-500 text-white (enter and delete) shadow-[0_1px_3px_rgba(0,0,0,0.5)]
 glass frost - bg-white/10 backdrop-blur (top div), bg-white/80 text-gray-900 (keys), bg-blue-400/80 text-white (enter and delete) shadow-[0_4px_10px_rgba(0,0,0,0.08)]
 warm minimal - bg-amber-50  (top div), bg-orange-400 text-amber-900 (keys), bg-orange-200 text-white (enter and delete) shadow-[0_2px_5px_rgba(0,0,0,0.08)] border border-amber-100
 tech neon - bg-black (top div), bg-gray-900 text-gray-100 (keys), bg-indigo-500 text-white (enter and delete) shadow-[0_0_8px_rgba(14,203,242,0.6)]
  sage calm -
  top: bg-[#0F172A]
  keys: bg-[#ECFDF5] text-[#064E3B]
  enter/delete: bg-[#10B981] text-white
  shadow: shadow-[0_2px_6px_rgba(0,0,0,0.12)]

  rose mono -
top: bg-[#020617]
keys: bg-[#FFF1F2] text-[#020617]
enter/delete: bg-[#FB7185] text-white
shadow: shadow-[0_2px_4px_rgba(0,0,0,0.15)]




 */
/*   slateMinimal: {
    name: "Slate Minimal",
    shell: "bg-slate-900",
    keyBg: "bg-slate-50",
    keyText: "text-slate-900",
    actKeyBg: "bg-blue-600",
    actKeyText: "text-white",
  } 
   
  loading renk paletleri
  mavi
  "k": [0.42, 0.31, 0.82, 1]
  mor
  "k": [0.42, 0.31, 0.82, 1]
  sarı
  son halka acık highlight
  "k": [0.85, 0.88, 1, 1]
  ekstra
  "k": [0.24, 0.45, 0.85, 1]
  
    lightMode: {
    name: "lightMode",
    shell: "bg-[#B3B3B3]",
    keyBg: "bg-[#F1F5F9]",
    keyText: "text-[#020617]",
    actKeyBg: "bg-[#808080]",
    actKeyText: "text-white",
    actKeyBorder: "border-2 border-white/20"
  },
    darkMode: {
    name: "Dark Mode",
    shell: "bg-[#020617]",
    keyBg: "bg-[#F1F5F9]",
    keyText: "text-[#020617]",
    actKeyBg: "bg-[#0F172A]",
    actKeyText: "text-white",
    actKeyBorder: "border-2 border-white/20"
  },
  */
