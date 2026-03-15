import { DeleteIcon } from "../components/Icons";
import { keyboardThemes } from "./KeyboardPalettes";
import type { KeyboardTheme } from "./KeyboardPalettes";

const ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "Ğ", "Ü"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ş", "İ"],
  ["Z", "X", "C", "V", "B", "N", "M", "Ö", "Ç", "SİL"],
  //["ENTER", "Z", "X", "C", "V", "B", "N", "M", "Ö", "Ç", "SİL"],
];

interface Props {
  onKey: (key: string) => void;
  theme: KeyboardTheme;

}

export const VirtualKeyboard = ({ onKey, theme}: Props) => {
const selectedTheme = keyboardThemes[theme];
  return (
    <div
      className={`w-full mt-2 sm:mt-3 max-w-3xl mx-auto rounded-2xl py-3 sm:py-4 px-1.5 sm:px-2  overflow-hidden 
       select-none ${selectedTheme.shell} border border-white/20`}
    > {/* en dış kısım, klavyenin kasası */}
      {ROWS.map((rows, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex w-full my-1 gap-0.75 sm:gap-1.25 touch-none overflow-hidden justify-center
          `}
        >
          {rowIndex === 1 && <div className="flex-[0.5]" />}
          {/* satırlar */}
          {rows.map((key) => {
            const isNotStr = key === "SİL";
            //const isNotStr = key === "ENTER" || key === "SİL";
            return (
              <button
                key={key} onMouseDown={(e) => e.preventDefault()}
                onClick={() => onKey(key)}
                className={` 
                h-[clamp(48px,7vh,64px)] flex items-center justify-center  cursor-pointer
                rounded-xl font-semibold transition-all duration-75 flex-1 shrink-0   
                border-b-[3px] active:border-b-0 active:translate-y-0.5
                active:shadow-inner md:hover:bg-white/20  active:bg-[rgba(255,255,255,0.6)] active:scale-[0.97] 
                ${
                  isNotStr
                    ? `flex-[1.8] shrink-0 px-2 ${selectedTheme.actKeyBg} ${selectedTheme.actKeyText} ${selectedTheme.actKeyBorder} hover:text-black border active:text-black uppercase tracking-wider shadow-sm text-[clamp(12px,1.5vw,16px)]`
                    : `flex-1 ${selectedTheme.keyBg} ${selectedTheme.keyText}  border text-[clamp(16px,2.7vw,24px)] `
                }
            `}
              >
                {key === "SİL" ? (
                  <DeleteIcon /> 
                ) : (
                  key
                )}
              </button>
            );
          })}
          {rowIndex === 1 && <div className="flex-[0.5]" />}
        </div>
      ))}
    </div>
  );
};
