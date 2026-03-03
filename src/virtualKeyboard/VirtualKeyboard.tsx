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
      className={`w-full mt-1 max-w-3xl mx-auto rounded-2xl py-2 sm:py-3 px-1.5 sm:px-2   overflow-hidden 
       select-none ${selectedTheme.shell}`}
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
                h-[clamp(38px,5.5vh,52px)] flex items-center justify-center  cursor-pointer
                rounded-lg font-medium transition-all duration-75 flex-1 shrink-0   
                border-b-[3px] active:border-b-0 active:translate-y-0.5
                active:shadow-inner md:hover:bg-white/20  active:bg-[rgba(255,255,255,0.6)] 
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
