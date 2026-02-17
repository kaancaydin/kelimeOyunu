import Tippy from "@tippyjs/react";
import { formatTime } from "../utils/FormatTime";
import { PauseIcon } from "./Icons";
import type { TimerModeProps } from "../types/propTypes";

interface Props {
  zaman: number;
  setTimerMode: React.Dispatch<React.SetStateAction<TimerModeProps>>;
  extraTimer: number;
  timerMode: TimerModeProps;
}

interface ExtraTimerProps {
  extraTimer: number;
  timerMode: string;
}

const ExtraTimer = ({ extraTimer, timerMode }: ExtraTimerProps) => {
  if (timerMode !== "extra") return null;

  const dots = Array.from({ length: 15 }, (_, i) => i);

  return (
    <div className="relative flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 animate-morph-in fade-in zoom-in duration-300">
      <div className="absolute inset-0">
        {dots.map((index) => {
          const rotation = index * (360 / 15);
          const isActive = index < extraTimer;

          return (
            <div
              key={index}
              className="absolute inset-0 flex justify-center"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <div
                className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? extraTimer <= 5
                      ? "bg-rose-600 shadow-[0_0_10px_#f43f5e] animate-pulse"
                      : "bg-orange-400 shadow-[0_0_8px_#fbbf24]"
                    : "bg-slate-700 opacity-20 scale-75"
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Timer = ({
  zaman,
  setTimerMode,
  extraTimer,
  timerMode,
}: Props) => {
  return (
    <div className="flex justify-center items-center sm:gap-6 gap-4">
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
      <div className="relative w-10 h-10 flex items-center justify-center">
        {timerMode === "extra" ? (
          <div className="animate-morph-in">
            <ExtraTimer extraTimer={extraTimer} timerMode={timerMode} />
          </div>
        ) : (
          <Tippy
            touch={false}
            content={
              <span className="text-[12px] px-2 py-1 rounded shadow-xl text-white bg-black">
                Zamanı Durdur
              </span>
            }
          >
            <button
              onClick={() => setTimerMode("extra")}
              className="animate-morph-in cursor-pointer group p-px sm:p-1 rounded-full ring-2 ring-white/20 transition-all hover:bg-white/10"
            >
              <PauseIcon />
            </button>
          </Tippy>
        )}
      </div>
    </div>
  );
};
