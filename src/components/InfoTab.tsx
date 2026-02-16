import { useState } from "react";
import { CloseIcon, DownArrowIcon, InfoIcon } from "./Icons";
import {
  keyboardThemes,
  type KeyboardTheme,
} from "../virtualKeyboard/KeyboardPalettes";

interface Props {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<KeyboardTheme>>;
}

export const InfoTab = ({ theme, setTheme }: Props) => {
  const [infoTab, setInfoTab] = useState(false);

  const selectedTheme = keyboardThemes[theme as KeyboardTheme];

  return (
    <>
      <button
        className="cursor-pointer absolute top-5 right-5 
    hover:scale-110 active:brightness-125 transition-all duration-150"
        onClick={() => {
          setInfoTab(true);
        }}
      >
        <InfoIcon />
      </button>
      {infoTab && (
        <div className="z-50 backdrop-blur-md fixed inset-0 bg-black/30 flex justify-center items-center">
          <div className="relative bg-linear-to-l from-blue-500 to-blue-400 flex flex-col gap-5 justify-center items-center text-black p-8 rounded-xl shadow-2xl border">
            <p className="text-2xl text-white">
              Oyun hakkındaki bilgiler burada yer alacaktır.
            </p>
            <button
              className="cursor-pointer absolute top-2 right-2 bg-white/20 rounded-full p-0.5 text-rose-700
              hover:bg-rose-700 hover:text-white active:scale-90 transition-all duration-150"
              onClick={() => {
                setInfoTab(false);
              }}
            >
              <CloseIcon />
            </button>
            <div className="w-full max-w-xs flex flex-col gap-1">
              <label className="text-white/90 text-sm font-semibold ml-2">
                Klavye Teması
              </label>
              <div className="relative flex items-center">
                <div
                  className={`${selectedTheme.actKeyBg} 
                absolute w-3 h-3 rounded-full  left-3 border border-white/20`}
                />
                <div
                  className={`${selectedTheme.shell} 
                absolute w-3 h-3 rounded-full  left-7 border border-white/20`}
                />
                <select
                  name="Modes"
                  value={theme}
                  className="bg-black/20 w-full text-white rounded-2xl pr-4 py-2 pl-12
                  border-white/30 border-2 appearance-none cursor-pointer 
                  focus:outline-none focus:ring-2 focus:ring-blue-400 
                  transition-all duration-200 hover:bg-black/30"
                  onChange={(e) => setTheme(e.target.value as KeyboardTheme)}
                >
                  {(Object.keys(keyboardThemes) as KeyboardTheme[]).map((t) => (
                    <option
                      key={t}
                      value={t}
                      className="bg-blue-900 text-white "
                    >
                      {keyboardThemes[t].name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 pointer-events-none">
                  <DownArrowIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* 

import { useState } from "react";
import { keyboardThemes, type KeyboardTheme } from "../virtualKeyboard/KeyboardPalettes";

export const CustomThemeDropdown = ({ theme, setTheme }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedTheme = keyboardThemes[theme as KeyboardTheme];

  return (
    <div className="w-full max-w-xs flex flex-col gap-1 relative font-rubik">
      <label className="text-white/90 text-sm font-semibold ml-2">
        Klavye Teması
      </label>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black/20 w-full text-white rounded-2xl pr-4 py-2.5 pl-3 
                   border-white/30 border-2 flex items-center justify-between 
                   cursor-pointer transition-all duration-200 hover:bg-black/30 
                   focus:ring-2 focus:ring-blue-400 outline-none"
      >
        <div className="flex items-center gap-3">
          <div className={`${selectedTheme.shell} w-4 h-4 rounded-full border border-white/40 shadow-sm`} />
          <span className="font-medium">{selectedTheme.name}</span>
        </div>
        
        <svg
          className={`w-4 h-4 text-white/50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>


      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          
          <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-[#1e293b] border-2 
                        border-white/20 rounded-2xl shadow-2xl z-50 overflow-hidden 
                        animate-in fade-in zoom-in duration-200">
            {(Object.keys(keyboardThemes) as KeyboardTheme[]).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTheme(t);
                  setIsOpen(false);
                }}
                className={`w-full p-3 flex items-center gap-3 transition-colors text-left
                  ${theme === t ? 'bg-blue-500/30 text-white' : 'hover:bg-white/10 text-white/70'}
                  border-b border-white/5 last:border-0`}
              >
                <div className={`${keyboardThemes[t].shell} w-4 h-4 rounded-full border border-white/20`} />
                <span className="flex-1 text-sm font-medium">{keyboardThemes[t].name}</span>
                
                {theme === t && (
                  <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};


*/
