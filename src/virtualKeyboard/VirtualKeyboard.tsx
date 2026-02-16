import { EnterIcon, DeleteIcon } from "../components/Icons";
import { keyboardThemes } from "./KeyboardPalettes";
import type { KeyboardTheme } from "./KeyboardPalettes";

const ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "Ğ", "Ü"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ş", "İ"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "Ö", "Ç", "SİL"],
];

interface Props {
  onKey: (key: string) => void;
  theme: KeyboardTheme;

}

export const VirtualKeyboard = ({ onKey, theme}: Props) => {
const selectedTheme = keyboardThemes[theme];
  return (
    <div
      className={`w-full mt-2 max-w-3xl mx-auto rounded-xl py-1 sm:py-2 overflow-hidden
       px-1 sm:px-2 select-none ${selectedTheme.shell}`}
    > {/* en dış kısım, klavyenin kasası */}
      {ROWS.map((rows, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex w-full my-1 gap-1 sm:gap-1.5 touch-none overflow-hidden
          `}
        >
          {" "}
          {/* satırlar */}
          {rows.map((key) => {
            const isNotStr = key === "ENTER" || key === "SİL";
            return (
              <button
                key={key} onMouseDown={(e) => e.preventDefault()}
                onClick={() => onKey(key)}
                className={` 
                h-[clamp(40px,6vh,48px)] flex items-center justify-center  cursor-pointer
                rounded-md font-medium transition-all duration-75 flex-1 shrink-0   
                active:translate-y-[1.5px] active:shadow-inner md:hover:bg-white/20  active:bg-[rgba(255,255,255,0.6)] 
                ${
                  isNotStr
                    ? `flex-[1.5] shrink-0 px-2 ${selectedTheme.actKeyBg} ${selectedTheme.actKeyText} ${selectedTheme.actKeyBorder} hover:text-black active:text-black uppercase tracking-wider shadow-sm text-[clamp(10px,1.5vw,16px)]`
                    : `flex-1 ${selectedTheme.keyBg} ${selectedTheme.keyText}  border border-slate-100 text-[clamp(14px,2vw,22px)] `
                }
            `}
              >
                {key === "SİL" ? (
                  <DeleteIcon />
                ) : key === "ENTER" ? (
                  <EnterIcon />
                ) : (
                  key
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

/*
 keyboard color pallets

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

arctic blue -
top: bg-[#020617]
keys: bg-[#EFF6FF] text-[#020617]
enter/delete: bg-[#3B82F6] text-white
shadow: shadow-[0_2px_5px_rgba(0,0,0,0.12)]


 */
