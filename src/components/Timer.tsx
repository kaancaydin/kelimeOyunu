import Tippy from "@tippyjs/react";
import { formatTime } from "../utils/FormatTime";
import { PauseIcon, PlayIcon } from "./Icons";

interface Props {
  zaman: number;
  setTimer: React.Dispatch<React.SetStateAction<boolean>>;
  timerActivate: boolean;
}

export const Timer = ({ zaman, setTimer, timerActivate }: Props) => {
  return (
    <div className="flex justify-center items-center gap-4">
      <div
        className={`
            flex justify-center items-center px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-xl font-bold 
           font-rubik ring-2   cursor-default select-none
          text-sm sm:text-xl text-white tracking-wider transition-all duration-300 
          shadow-lg tabular-nums
          ${
            zaman > 45
              ? "bg-emerald-500 ring-emerald-400/40 shadow-emerald-400/30"
              : zaman > 15
                ? "bg-orange-500 ring-orange-400 shadow-orange-400/30 scale-105 animate-[shake_.25s_infinite]"
                : "bg-rose-600 ring-rose-400/50 shadow-rose-500/30 scale-110 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.5)] "
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
            {timerActivate ? "Zamanı durdur" : "Devam et"}
          </span>
        }
      >
        <button
          className="group cursor-pointer p-px sm:p-1 rounded-full ring transition-all duration-200
          hover:scale-105 active:scale-95 ease-out"
          onClick={() => setTimer(!timerActivate)}
        >
          {timerActivate ? (
            <div className="transition-all duration-200 ease-out group-active:translate-y-0.5">
              <PauseIcon />
            </div>
          ) : (
            <div className="transition-all duration-200 ease-out group-active:translate-x-1 group-active:scale-90">
              <PlayIcon />
            </div>
          )}
        </button>
      </Tippy>
    </div>
  );
};
