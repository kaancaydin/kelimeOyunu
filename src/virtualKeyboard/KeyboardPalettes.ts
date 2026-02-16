export const keyboardThemes = {
  defaultMode: {
    name: "Default Mode",
    shell: "bg-[#445A88]",
    keyBg: "bg-[#DDE2EE]",
    keyText: "text-[#020617]",
    actKeyBg: "bg-[#778DBB]",
    actKeyText: "text-white",
    actKeyBorder: "border border-sky-400/20 shadow-sm shadow-sky-400/20"
  },
  lightMode: {
    name: "Light Mode",
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
  techNeon: {
    name: "Tech Neon",
    shell: "bg-black",
    keyBg: "bg-gray-900",
    keyText: "text-gray-100",
    actKeyBg: "bg-cyan-400",
    actKeyText: "text-white",
    actKeyBorder: "border-0"
  },
  sageCalm: {
    name: "Sage Calm",
    shell: "bg-[#085E41]",
    keyBg: "bg-[#ECFDF5]",
    keyText: "text-[#042F21]",
    actKeyBg: "bg-[#10B981]",
    actKeyText: "text-white",
    actKeyBorder: "border-1 border-[#D0FBED]"
  },
  warmMinimal: {
    name: "Warm Minimal",
    shell: "bg-amber-50",
    keyBg: "bg-amber-300",
    keyText: "text-amber-900",
    actKeyBg: "bg-rose-400",
    actKeyText: "text-white",
    actKeyBorder: "border border-orange-100"
  },
  roseMono: {
    name: "Rose Mono",
    shell: "bg-[#7A0C1C]",
    keyBg: "bg-[#FFF1F2]",
    keyText: "text-[#020617]",
    actKeyBg: "bg-[#FB7185]",
    actKeyText: "text-white",
    actKeyBorder: "border border-rose-100"
  },
  articBlue: {
    name: "Arctic Blue",
    shell: "bg-[#003B99]",
    keyBg: "bg-[#B6D0FF]",
    keyText: "text-[#020617]",
    actKeyBg: "bg-[#3B82F6]",
    actKeyText: "text-white",
    actKeyBorder: "border border-blue-100"
  }
} as const;

export type KeyboardTheme = keyof typeof keyboardThemes;

export const isKeyboardTheme = (value: string): value is KeyboardTheme => {
  return value in keyboardThemes;
};


/*
 keyboard color pallets

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
  
  
  */