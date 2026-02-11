import { forwardRef, useImperativeHandle, useRef, useState } from "react";
//import "./Timer.css";

export type TimerHandle = {
  start: () => void;
  pause: () => void;
  reset: () => void;
};

interface TimerButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}

const TimerButton = ({
  children,
  className = "",
  onClick,
}: TimerButtonProps) => {
  return (
    <button
      className={`${className} cursor-pointer px-5 py-2 w-32 h-14 rounded-full text-white hover:scale-105 
    font-semibold transition-all duration-200 ease-out border-2 shadow-sm hover:shadow-2xl active:scale-[0.88]`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Component
export const Timer = forwardRef<TimerHandle>((props, ref) => {
  const [zaman, setZaman] = useState(200);
  const timerRef = useRef<number | null>(null);

  const startTimer = () => {
    if (timerRef.current) return;
    timerRef.current = window.setInterval(() => {
      setZaman((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
  };

  const pauseTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const resetTimer = () => {
    setZaman(180);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  useImperativeHandle(ref, () => ({
    start: () => startTimer(),
    pause: () => pauseTimer(),
    reset: () => resetTimer(),
  }));

  const formatTime = (totalSeconds: number) => {
    const dakika = Math.floor(totalSeconds / 60);
    const saniye = totalSeconds % 60;
    const pad = (n: number) => (n < 10 ? "0" + n : n);
    return `${pad(dakika)}:${pad(saniye)}`;
  };

  return (
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
  );
});

{
  /*    <div className="flex flex-col text-center justify-center items-center gap-4">
        ...sayaç buraya geri gelecek
       <TimerButton
        onClick={startTimer}
        className="bg-linear-to-br from-emerald-900/90 to-emerald-700 border-emerald-800 shadow-emerald-400/40"
      >
        Başlat
      </TimerButton>
      <TimerButton
        onClick={pauseTimer}
        className="bg-linear-to-br from-amber-700/90 to-amber-500  border-amber-600 shadow-amber-400/40"
      >
        Durdur
      </TimerButton>
      <TimerButton
        onClick={resetTimer}
        className="bg-linear-to-br from-red-900/90 to-red-700 border-red-800  shadow-red-400/40"
      >
        Sıfırla
      </TimerButton> 

      <button className="hidden relative w-[3.5em] h-[3.9em] bg-transparent border-0 cursor-pointer p-0 group">
        <span className="absolute left-0 top-1.5 w-full h-[3.5em] bg-black border border-black rounded-full z-10"></span>

        <span
          className="
          absolute left-0 top-0 w-full h-[3.5em]
          bg-white border border-black rounded-full
          flex items-center justify-center
          text-2xl font-bold text-black z-20
          transition-all duration-100 ease-in-out
          group-active:top-1.5
          group-active:bg-black
          group-active:text-white
"
        >
          TOP
        </span>
      </button>
    </div> */
}
