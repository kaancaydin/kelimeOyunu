import { ScoreBoard } from "./ScoreBoard";
import { GameButton } from "../elementStyles/GameButtons";
import { ArrowIcon, BackIcon } from "./Icons";
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
                bg-white/1 backdrop-blur-xl border border-white/20 
                rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] 
                w-[85vw] sm:w-[70vw] max-w-225 min-h-125 
                transition-all duration-500 hover:shadow-indigo-500/20
                mt-5"
    >
      {/* Başlık Bölümü */}
      <div className="text-center space-y-2">
        <h2 className="text-5xl font-black tracking-tighter bg-linear-to-b from-white to-gray-400 bg-clip-text text-transparent">
          TEBRİKLER!
        </h2>
        <p className="text-gray-400 uppercase font-medium tracking-widest  text-sm">
          OYUN SONA ERDİ
        </p>
      </div>
      <div className="w-full flex justify-center py-1 border-y border-white/5 overflow-hidden">
        <p className="uppercase text-base sm:text-xl text-gray-300 font-semibold tracking-wider leading-6">
          İSTATİSTİKLER
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
      <div className="grid grid-cols-[1fr_3fr] sm:grid-cols-[2fr_5fr] gap-2 sm:gap-3">
        <button
          onClick={() => setStartGame(false)}
          className="cursor-pointer  bg-[rgba(255,255,255,0.2)] rounded-full
           items-center justify-center group relative inline-flex p-2
          hover:scale-105 active:opacity-50 transition-all duration-150"
        >
          <BackIcon />
        </button>
        <GameButton
          onClick={RestartTheGame}
          variant="restart"
          className="text-base uppercase tracking-widest"
        >
          Tekrar oyna
          <ArrowIcon />
        </GameButton>
      </div>
    </div>
  );
};
