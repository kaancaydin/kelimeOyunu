import { ScoreBoard } from "../components/ScoreBoard";
import { WordDescription } from "../components/WordDescription";
import { WordInput } from "../components/WordInput";
import { CloseIcon, PassIcon, BackIcon } from "../components/Icons";
import Tippy from "@tippyjs/react";
import { GameButton } from "./GameButtons";
import type { GameLogicType } from "../types/GameLogicTypes";

interface MainGameProps {
  state: GameLogicType["state"];
  actions: GameLogicType["actions"];
  refs: GameLogicType["refs"];
}

export const MainGame = ({ state, actions, refs }: MainGameProps) => {
  const { aktifKelime, currentIndex, gameEnd, harfler, score, sonuc } = state;
  const { setHarfler, kontrolEt, harfVer, gaveUp, setGameEnd } = actions;
  const { inputRefs } = refs;
  return (
    <div
      className="p-4 sm:p-6 rounded-3xl sm:rounded-[3rem] 
             flex flex-col justify-between items-center gap-4 sm:gap-6 
             bg-white/5 backdrop-blur-md border border-white/10 
             w-[95vw] sm:w-[90vw] max-w-4xl 
             h-fit max-h-[92svh] sm:max-h-none
             shadow-2xl transition-all duration-300 mx-auto overflow-y-auto
             "
    >
      <button className="fixed bottom-20 left-4 hidden">
        <BackIcon  />
      </button>
      <div className="w-screen/2 sm:w-full text-center">
        <WordDescription aktifKelime={aktifKelime} />
      </div>
      <div className=" py-1 sm:py-4 flex justify-center">
        <WordInput
          key={`${currentIndex}-${gameEnd}`}
          setHarfler={setHarfler}
          harfler={harfler}
          inputRefs={inputRefs}
          onEnter={kontrolEt}
        />
      </div>

      <GameButton
        variant="clue"
        onClick={harfVer}
        className="relative flex items-center gap-2"
      >
        Harf Al
        <span className="text-blue-200 group-hover:rotate-12 group-hover:scale-125 transition-all duration-300 drop-shadow-[0_0_8px_rgba(191,219,254,0.8)]">
          ✨
        </span>
        <span className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-10 blur-xl transition-opacity -z-10" />
      </GameButton>
      <div className="w-full flex justify-center py-2 border-y border-white/5 overflow-hidden">
        <div className="grid  grid-cols-4 gap-3 w-full max-w-md mx-auto">
          <ScoreBoard score={score} />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
        <GameButton
          variant="check"
          onClick={kontrolEt}
          children={"Kontrol Et"}
        />
        <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
          <GameButton
            variant="pass"
            onClick={gaveUp}
            disabled={score.pass === 0}
            ternaryOp={
              score.pass === 0
                ? "text-slate-400 opacity-50 cursor-not-allowed active:translate-y-0 active:shadow-[0_4px_0_0_#B6C3D4]"
                : "text-slate-700"
            }
          >
            <div className="group-hover:translate-x-1 transition-transform duration-200">
              <PassIcon />
            </div>
            <span>PAS</span>
            <div
              className={`flex items-center justify-center text-center
               rounded-lg px-2 py-1 text-[0.8em]
              ${score.pass === 0 ? "text-red-400 bg-red-500/20" : "text-white/80 bg-gray-500 "}`}
            >
              {score.pass}
            </div>
          </GameButton>
          <Tippy
            arrow={false}
            offset={[0, 10]}
            content={
              <span className="text-[12px] px-2 py-1 rounded shadow-xl bg-black">
                Oyundan Çık
              </span>
            }
          >
            <GameButton variant="close" onClick={() => setGameEnd(true)}>
              <CloseIcon />
            </GameButton>
          </Tippy>
        </div>
      </div>
      <p
        className={`text-xl sm:text-3xl mt-2 font-black tracking-widest
    ${
      sonuc === "Doğru!"
        ? "text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.6)] animate-[bounce_2s_infinite]"
        : "text-rose-500 animate-[shake_0.5s_ease-in-out]" /* Yanlışsa titresin */
    }`}
      >
        {sonuc.toUpperCase()}
      </p>
    </div>
  );
};
