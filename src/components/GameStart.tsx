import { StartButton } from "../elementStyles/startButton";

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
  //geçici flex eklendi!!!
  return (
    <div className=" text-center flex justify-center flex-col gap-2 ">
      <h1
        className="text-center uppercase font-black mb-8 font-cinzel flex flex-col items-center
        animate-[float_6s_ease-in-out_infinite] cursor-default select-none group-hover:shadow-[0_0_20px_6px_rgba(99,102,241,1)]
        motion-reduce:animate-none
        "
      >
        <span
          className="
            text-6xl 
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

        <span className="text-5xl font-bold  tracking-[0.25em] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          Oyunu
        </span>
        <div className="relative w-40 sm:w-56 h-px bg-linear-to-r from-transparent via-indigo-500 to-transparent mt-4 overflow-hidden">
          {/* sweep */}
          <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent animate-[sweep_3s_linear_infinite]" />

          {/* particles */}
          <span className="absolute left-6 top-0 w-0.5 h-0.5 bg-indigo-300 rounded-full animate-[sparkle_2s_ease-in-out_infinite]" />
          <span className="absolute right-6 top-0 w-0.5 h-0.5 bg-indigo-300 rounded-full animate-[sparkle_3s_ease-in-out_infinite]" />

          {/* center orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-300 shadow-[0_0_12px_4px_rgba(99,102,241,0.8)] animate-pulse" />
        </div>
      </h1>

      <p className="text-gray-500 tracking-[0.4em] text-xs uppercase mb-5 select-none font-cinzel">
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
