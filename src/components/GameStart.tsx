import { StartButton } from "../elementStyles/StartButton";

import type { GameLogicType } from "../types/GameLogicTypes";
interface MainGameProps {
  actions: GameLogicType["actions"];
}

export const GameStart = ({ actions }: MainGameProps) => {
  const { StartTheGame } = actions;

  const handleStart = () => {
    setTimeout(() => {
      StartTheGame("classic");
    }, 400);
  };
  const fillGap = () => {
    setTimeout(() => {
      StartTheGame("fillgap");
    }, 400);
  };
  return (
    <div className=" text-center flex justify-center flex-col gap-2 ">
      <h1 className="flex flex-col items-center select-none gap-4">
        <div className="flex gap-2">
          {"KELİME".split("").map((letter, i) => (
            <span
              key={i}
              className=" w-13 h-13 sm:w-16 sm:h-16  
              flex items-center justify-center
              text-3xl sm:text-4xl
              font-black font-clash
              text-white rounded-md
              border border-indigo-400
               bg-neutral-900
               shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
            >
              {letter}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          {"OYUNU".split("").map((letter, i) => (
            <span
              key={i}
              className=" w-12 h-12 sm:w-14 sm:h-14
              flex items-center justify-center
              text-3xl sm:text-4xl
              font-black font-clash
              text-white rounded-md
              border border-indigo-400
               bg-neutral-900
               shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
            >
              {letter}
            </span>
          ))}
        </div>
        <div className="relative w-52 sm:w-72 h-px bg-linear-to-r from-transparent via-indigo-500 to-transparent mt-4 overflow-hidden">
          {/* sweep */}
          <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent animate-[sweep_3s_linear_infinite]" />

          {/* particles */}
          <span className="absolute left-6 top-0 w-0.5 h-0.5 bg-indigo-300 rounded-full animate-[sparkle_2s_ease-in-out_infinite]" />
          <span className="absolute right-6 top-0 w-0.5 h-0.5 bg-indigo-300 rounded-full animate-[sparkle_3s_ease-in-out_infinite]" />

          {/* center orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-300 shadow-[0_0_12px_4px_rgba(99,102,241,0.8)] animate-pulse" />
        </div>
      </h1>
      <h1
        className=" hidden
        text-center uppercase font-black mb-8 font-cinzel  flex-col items-center
        animate-[float_8s_ease-in-out_infinite] cursor-default select-none group-hover:shadow-[0_0_20px_6px_rgba(99,102,241,1)]
        motion-reduce:animate-none
        "
      >
        <span
          className="
            text-6xl 
            sm:text-7xl
            text-white 
            font-black 
            tracking-wider
            drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
            relative
          "
        >
          KELİME
          {/* Yazının arkasındaki yumuşak mor parlama (Aura) */}
          <span className="absolute inset-0 blur-2xl bg-indigo-500/30 -z-10 animate-pulse"></span>
        </span>

        <span className="text-4xl sm:text-5xl font-bold  tracking-[0.25em] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          Oyunu
        </span>
        <div className="relative w-52 sm:w-72 h-px bg-linear-to-r from-transparent via-indigo-500 to-transparent mt-4 overflow-hidden">
          {/* sweep */}
          <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent animate-[sweep_3s_linear_infinite]" />

          {/* particles */}
          <span className="absolute left-6 top-0 w-0.5 h-0.5 bg-indigo-300 rounded-full animate-[sparkle_2s_ease-in-out_infinite]" />
          <span className="absolute right-6 top-0 w-0.5 h-0.5 bg-indigo-300 rounded-full animate-[sparkle_3s_ease-in-out_infinite]" />

          {/* center orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-300 shadow-[0_0_12px_4px_rgba(99,102,241,0.8)] animate-pulse" />
        </div>
      </h1> {/* hidden for now */}

      <p className="text-indigo-200 tracking-[0.3em] text-xs uppercase mb-5 mt-5 select-none font-cinzel">
        Bil • Kazan • Öğren
      </p>

      <StartButton
        mode="KLASİK MOD"
        onClick={handleStart}
        rgbColor="bg-[conic-gradient(from_0deg,transparent_0%,#4338ca_8%,#4f46e5_20%,#6366f1_35%,#818cf8_45%,#4f46e5_55%,transparent_65%)]"
        borderColor="            
        border border-white/15
        shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]
        bg-indigo-950/70"
      />
      <StartButton
        mode="Boşlukları Doldur"
        onClick={fillGap}
        rgbColor="bg-[conic-gradient(from_0deg,transparent_0%,#0891b2_8%,#06b6d4_20%,#22d3ee_35%,#67e8f9_45%,#06b6d4_55%,transparent_65%)]"
        borderColor="            
        bg-cyan-950/80 
        border border-white/15
        shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
      />
    </div>
  );
};
