import { PlayIcon } from "../components/Icons";
import type { StartButtonProps } from "../types/elementTypes";

export const StartButton = ({
  onClick,
  rgbColor = "",
  borderColor = "",
  mode = ""
}: StartButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="
        relative group
        flex items-center justify-center gap-3
        px-12 py-4
        uppercase cursor-pointer
        rounded-full
        font-clash font-black text-xl tracking-widest
        transition-all duration-300
        active:scale-95
        p-0.75 
        overflow-hidden
        "
    >
      {/* Dönen RGB Işık Katmanı */}
      <span
        className={`
            absolute -inset-full
            ${rgbColor}
            animate-spin-slow
            blur-sm     
        `}
      />

      {/* İç Katman: Transparanlık burada sağlanıyor */}
      <span
        className={`
            absolute inset-0.5 
            rounded-full 
            backdrop-blur-2xl
            ${borderColor}
        `}
      />
      {/* İçerik */}
      <div className="relative z-10 flex items-center gap-3 text-white">
        <div className="transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-2 group-active:translate-x-37.5 group-active:opacity-0">
          <PlayIcon />
        </div>
        <span className="group-active:translate-x-2  transition-transform duration-300">
          {mode}
        </span>
      </div>
    </button>
  );
};
