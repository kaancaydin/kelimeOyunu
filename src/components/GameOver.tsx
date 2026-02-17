import { ScoreBoard } from "./ScoreBoard";
import { GameButton } from "../elementStyles/GameButtons";
import { ArrowIcon, BackIcon } from "./Icons";
import type { GameLogicType } from "../types/GameLogicTypes";
interface MainGameProps {
  state: GameLogicType["state"];
  actions: GameLogicType["actions"];
}

export const GameOver = ({ state, actions }: MainGameProps) => {
  const { score, totalPoints, ozetListesi } = state;
  const { RestartTheGame, setStartGame } = actions;
  return (
    <div
      className="flex items-center flex-col gap-8 p-6 sm:p-10 
             bg-white/1 backdrop-blur-xl border border-white/20 
             rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] 
             w-[92vw] sm:w-[85vw] max-w-4xl 
             transition-all duration-500 hover:shadow-indigo-500/20"
    >
      {/* Başlık Bölümü */}
      <div className="text-center space-y-1 sm:space-y-2 -mb-5 sm:-mb-3">
        <h2 className="text-3xl sm:text-5xl font-black tracking-tighter bg-linear-to-b from-white to-gray-400 bg-clip-text text-transparent">
          TEBRİKLER!
        </h2>
        <p className="text-gray-400 uppercase font-medium tracking-widest text-xs sm:text-sm">
          OYUN SONA ERDİ
        </p>
      </div>
      <div className="w-full flex justify-center py-1 border-y border-white/5 overflow-hidden">
        <p className="uppercase text-base sm:text-xl text-gray-300 font-semibold tracking-wider leading-6">
          İSTATİSTİKLER
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 w-full max-w-md mx-auto">
        <ScoreBoard score={score} />
      </div>
      {/* Puan  */}
      <div
        className="flex flex-col items-center bg-linear-to-br from-indigo-600/40 to-purple-700/40 
      backdrop-blur-md px-2 py-3 sm:px-10 sm:py-4 rounded-4xl border border-white/20 shadow-2xl"
      >
        <span className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide font-black">Toplam skor</span>
        <p className="text-2xl sm:text-5xl tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] font-rubik font-lack ">{totalPoints}</p>
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
      <div className="w-full space-y-3 sm:space-y-5 mt-0 sm:mt-4">
        {ozetListesi.map((soru, index) => (
          <div
            key={index}
            className="w-full bg-white/5 border border-white/10 rounded-2xl
            p-3 sm:p-6 flex flex-col gap-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-gray-400">Soru</span>
                <span className="text-indigo-400 font-mono text-[16px] ml-1">
                  {soru.soruSayisi}
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-white uppercase  tracking-tight">
                  {soru.kelime}
                </h4>
              </div>
              <div
                className={`px-2 sm:px-4 py-0.5 sm:py-1 rounded-full text-xs font-bold border
                ${
                  soru.durum === "dogru"
                    ? "bg-green-500/20 text-green-400 border-green-500/40"
                    : soru.durum === "pas"
                      ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/40"
                      : "bg-red-500/20 text-red-400 border-red-400/40"
                }`}
              >
                {soru.durum.toUpperCase()}
              </div>
            </div>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed border-l-2 border-white/10 pl-2 sm:pl-4">
              {soru.aciklama}
            </p>
            <div className="flex gap-4 pt-0px sm:pt-2  text-xs sm:text-[14px] font-medium upppercase tracking-widest">
              <span>
                Alınan harf: 
                <b className=" font-rubik font-black text-[#50A2FF]"> {soru.alinanHarf}</b>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
