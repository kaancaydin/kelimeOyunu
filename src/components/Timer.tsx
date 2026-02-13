import Tippy from "@tippyjs/react";
import { formatTime } from "../utils/FormatTime";
import { StopIcon } from "./Icons";

interface Props {
  zaman: number;
  onStop: () => void;
}

export const Timer = ({ zaman, onStop }: Props) => {
  return (
    <div className="flex justify-center items-center gap-4">
      <div
        className={`
          flex justify-center items-center min-w-20 h-[2.2rem] p-0 sm:px-3 sm:py-3 rounded-xl font-bold 
           font-rubik ring-2 ring-white/20 border
          text-base sm:text-2xl text-white tracking-wider transition-all duration-300 shadow-lg tabular-nums
          ${
            zaman > 45
              ? "bg-emerald-500 border-emerald-400 shadow-emerald-400/30"
              : zaman > 15
                ? "bg-orange-500 border-orange-400 shadow-orange-400/30 scale-105 animate-[shake_.25s_infinite]"
                : "bg-rose-600 border-rose-400 shadow-rose-500/30 scale-110 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.5)] "
          } 
        `}
      >
        {formatTime(zaman)}
      </div>
      <Tippy
        arrow={false}
        offset={[0, 10]}
        content={
          <span className="text-[12px] px-2 py-1 rounded shadow-xl bg-black">
            Zamanı durdur
          </span>
        }
      >
        <button
          className="cursor-pointer hover:scale-110 transition-all duration-150 p-1
      rounded-full bg-[rgba(255,255,255,0.2)]"
          onClick={onStop}
        >
          <StopIcon />
        </button>
      </Tippy>
    </div>
  );
};
