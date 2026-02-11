import { ScoreBoard } from "./ScoreBoard";
import { GameButton } from "./GameButtons";
import { ArrowIcon } from "./Icons";

interface ScoreProps {
  correct: number;
  wrong: number;
  takenWords: number;
  pass: number;
}

interface Props {
  totalPoints: number;
  onRestart: () => void;
  score: ScoreProps;
}

export const GameOver = ({ totalPoints, score, onRestart }: Props) => {
  return (
    <div
      className="flex justify-center items-center flex-col gap-8 p-10 
                bg-white/10 backdrop-blur-xl border border-white/20 
                rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] 
                w-[80vw] sm:w-[60vw] max-w-225 min-h-125 
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

      {/* 
      <button
        onClick={onRestart}
        className="group relative inline-flex items-center justify-center px-10 py-4 
               font-bold text-white transition-all duration-200 cursor-pointer
               bg-blue-600 font-pj rounded-full focus:outline-none 
               focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 
               hover:bg-blue-500 hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30"
      >
        <span className="text-xl uppercase tracking-widest">Tekrar Oyna</span>
        <svg
          className="w-5 h-5 ml-2 -mr-1 group-hover:translate-x-1 transition-transform"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button> */}

      <GameButton
        onClick={onRestart}
        variant="restart"
        className="text-xl uppercase tracking-widest"
      >
        Tekrar oyna
        <ArrowIcon />
      </GameButton>
    </div>
  );
};
