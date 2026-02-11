import type { ButtonProps } from "../types/elementTypes";

export const GameButton = ({
  onClick,
  children,
  className = "",
  /*   iconClass = "",
  icon, */
  variant,
  ternaryOp,
  disabled,
  /*   extra,
  extraClass = "", */
}: ButtonProps) => {
  const variants = {
    check: `w-full sm:w-auto px-10 py-3 rounded-full 
            text-white font-bold text-lg uppercase transition-all
            bg-linear-to-r from-indigo-600 to-purple-600 uppercase
            hover:from-indigo-500 hover:to-purple-500 text-[10px] sm:text-sm
            shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40
            hover:scale-105 active:scale-95`,
    close: `hover:scale-90 p-3 bg-red-500/10 border border-red-500/20 
            rounded-full hover:bg-red-500/20 transition-all`,
    pass: `group flex items-center gap-3  py-2 sm:px-4 rounded-3xl flex-row
                   cursor-pointer font-black tracking-wider w-full sm:w-auto justify-center
                   bg-linear-to-r from-slate-200 to-slate-300 shadow-[0_4px_0_0_#B6C3D4] 
                   hover:from-slate-300 hover:to-slate-400 active:shadow-none active:translate-y-1 
                   transition-all duration-150 ease-in-out`,
    clue: `group relative uppercase px-4 sm:px-10 py-2 sm:py-3 rounded-full font-extrabold 
            cursor-pointer text-base sm:text-lg
            bg-white/5 backdrop-blur-sm border border-white/20 text-blue-400
            hover:bg-blue-500 hover:text-white hover:border-blue-400
            shadow-sm hover:shadow-[0_10px_20px_-10px_rgba(59,130,246,0.5)]
            transition-all duration-300 hover:-translate-y-1 active:scale-95
        `,
    restart: `group relative inline-flex items-center justify-center px-10 py-4 
            font-bold text-white transition-all duration-200 
            bg-blue-600 font-pj rounded-full focus:outline-none 
            focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 
            hover:bg-blue-500 hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30`,
  };

  return (
    <button
      disabled={disabled}
      className={`cursor-pointer
        ${className}  ${ternaryOp} ${variants[variant]}
        `}
      onClick={onClick}
    >
      {/*{icon && <div className={`${iconClass}`}>{icon}</div>}*/}
      {children}
      {/*{extra && <div className={`${extraClass}`}>{extra}</div>}*/}
    </button>
  );
};
