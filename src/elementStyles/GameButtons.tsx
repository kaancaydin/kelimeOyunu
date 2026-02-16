import Tippy from "@tippyjs/react";
import type { ButtonProps } from "../types/elementTypes";

export const GameButton = ({
  onClick,
  children,
  className = "",
  tippyTitle = "",
  variant,
  ternaryOp,
  disabled,
  /*   
  iconClass = "",
  icon,
  extra,
  extraClass = "" 
  */
}: ButtonProps) => {
  const variants = {
    check: `w-full sm:w-auto px-8 py-3 rounded-full hidden
            text-white font-bold text-lg uppercase transition-all
            bg-linear-to-r from-indigo-600 to-purple-600 uppercase
            hover:from-indigo-500 hover:to-purple-500 text-[10px] sm:text-sm
            shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40
            hover:scale-105 active:scale-95`,
    checkSmall: `group px-1.5 py-0.5 sm:px-2 sm:py-1.5  
                bg-[#47369B] rounded-full hover:bg-purple-700
                text-base sm:text-lg active:scale-95 shadow-lg ring ring-white/20`,
    close: `hover:scale-90 p-0.5 sm:p-2 bg-red-500/10 border border-red-500/20 z-50
            rounded-full hover:bg-red-500/20 transition-all duration-200 top-3.5 fixed right-2`,
    pass: `group flex items-center gap-1 sm:gap-3 px-1.5 py-0.5 sm:px-2 sm:py-1 
            rounded-full flex-row
            font-black  justify-center text-sm sm:text-lg
            bg-linear-to-r from-slate-200 to-slate-300 shadow-[0_2px_0_0_#B6C3D4] 
            sm:shadow-[0_4px_0_0_#B6C3D4]
            hover:from-slate-300 hover:to-slate-400 active:shadow-none active:translate-y-0.5 
            transition-all duration-150 ease-in-out`,
    clue: `group relative uppercase px-1.5 py-0.5 sm:px-3 sm:py-1.5 
            rounded-full font-bold text-[11px] sm:text-base
            bg-white/5 backdrop-blur-sm ring-2 ring-white/10 text-blue-400
            hover:bg-blue-500 hover:text-white hover:ring-blue-400
            shadow-sm transition-all duration-300 active:scale-95  
            hover:shadow-[0_10px_20px_-10px_rgba(59,130,246,0.5)]`,
    restart: `group relative inline-flex items-center justify-center px-3 py-1 sm:px-5 sm:py-3 
            font-bold text-white text-sm sm:text-base transition-all duration-200 
            bg-blue-600 rounded-full focus:outline-none 
            focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 
            hover:bg-blue-500 hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30`,
    restart2: ` cursor-pointer rounded-full
                bg-white/10 backdrop-blur
                ring-1 ring-white/20
                inline-flex items-center justify-center
                p-2 sm:p-3
                hover:scale-105 hover:bg-white/20
                active:scale-95
                transition-all duration-150`,
  };

  return (
    <Tippy
      arrow={false}
      touch={false}
      disabled={!tippyTitle}
      offset={[0, 10]}
      content={
        <span className="text-[12px] px-2 py-1 rounded shadow-xl text-white bg-black">
          {tippyTitle}
        </span>
      }
    >
      <button
        disabled={disabled}
        className={`cursor-pointer select-none
        ${className}  ${ternaryOp} ${variants[variant]}
        `}
        onClick={onClick}
      >
        {/*{icon && <div className={`${iconClass}`}>{icon}</div>}*/}
        {children}
        {/*{extra && <div className={`${extraClass}`}>{extra}</div>}*/}
      </button>
    </Tippy>
  );
};
