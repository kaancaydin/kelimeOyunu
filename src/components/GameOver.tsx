import { ScoreBoard } from "./ScoreBoard";
import { GameButton } from "./GameButtons";
import { ArrowIcon, CloseIcon } from "./Icons";
import Tippy from "@tippyjs/react";

/* interface ScoreProps {
  correct: number;
  wrong: number;
  takenWords: number;
  pass: number;
}

interface Props {
  totalPoints: number;
  onRestart: () => void;
  score: ScoreProps;
} */
import type { GameLogicType } from "../types/GameLogicTypes";
interface MainGameProps {
  state: GameLogicType["state"];
  actions: GameLogicType["actions"];
}

export const GameOver = ({ state, actions }: MainGameProps) => {
  const { score, totalPoints } = state;
  const { RestartTheGame, setStartGame } = actions;
  return (
    <div
      className="flex justify-center items-center flex-col gap-8 p-10 
                bg-white/10 backdrop-blur-xl border border-white/20 
                rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] 
                w-[80vw] sm:w-[60vw] max-w-225 min-h-125 
                transition-all duration-500 hover:shadow-indigo-500/20
                mt-5"
    >
      <Tippy
        arrow={false}
        offset={[0, 10]}
        content={
          <span className="text-[12px] px-2 py-1 rounded shadow-xl bg-black">
            Çıkış
          </span>
        }
      >
        <button onClick={()=>setStartGame(false)}
        className="cursor-pointer fixed top-5 left-5 bg-[rgba(255,255,255,0.2)] p-1 rounded-full
          hover:scale-105 active:opacity-50 transition-all duration-150">
          <CloseIcon />
        </button>
      </Tippy>

      {/* Başlık Bölümü */}
      <div className="text-center space-y-2">
        <h2 className="text-5xl font-black tracking-tighter bg-linear-to-b from-white to-gray-400 bg-clip-text text-transparent">
          TEBRİKLER!
        </h2>
        <p className="text-gray-400 uppercase font-medium tracking-widest  text-sm">
          OYUN SONA ERDİ
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full max-w-md mx-auto">
        <ScoreBoard score={score} />
      </div>

      {/* Puan Madalyonu */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-linear-to-r from-yellow-400 to-orange-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative px-8 py-3 bg-black/40 border border-white/10 rounded-full">
          <p className="text-3xl font-bold bg-linear-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent">
            Puan: {totalPoints}
          </p>
        </div>
      </div>

      <GameButton
        onClick={RestartTheGame}
        variant="restart"
        className="text-xl uppercase tracking-widest"
      >
        Tekrar oyna
        <ArrowIcon />
      </GameButton>
    </div>
  );
};
