import { ScoreBoard } from "./ScoreBoard";
import { GameButton } from "../elementStyles/GameButtons";
import { ArrowIcon, BackIcon } from "./Icons";
import type { GameLogicType } from "../types/GameLogicTypes";
interface MainGameProps {
  state: GameLogicType["state"];
  actions: GameLogicType["actions"];
}

export const GameOver = ({ state, actions }: MainGameProps) => {
  const { score, totalPoints, ozetListesi, gameMode } = state;
  const { RestartTheGame, BackToMenu } = actions;
  const qetQuestionStatus = (durum: string | null) => {
    switch (durum) {
      case "dogru":
        return "DOĞRU"; //✓
      case "yanlis":
        return "YANLIŞ"; //✗
      default:
        return "PAS";
    }
  };

  const shineTheGap = (cumle: string, kelime: string) => {
    if (!kelime || !cumle) return "";

    const maskKelime = kelime.toLocaleUpperCase("tr-TR");
    const maskCumle = cumle.toLocaleUpperCase("tr-TR");

    if (!maskCumle.includes(maskKelime)) return cumle;

    const startIndex = maskCumle.indexOf(maskKelime);
    const endIndex = startIndex + maskKelime.length;

    const shineIt = (
      <span className="relative inline-block mx-1 font-black tracking-tight text-indigo-400">
        {cumle.substring(startIndex, endIndex)}
        <span className="absolute -bottom-1 left-0 right-0 h-1 bg-indigo-500/50 rounded-full shadow-[0_0_4px_rgba(99,102,241,0.6)]" />

        <span className="absolute inset-0 bg-indigo-500/10 blur-sm -z-10 rounded" />
      </span>
    );

    return (
      <>
        {cumle.substring(0, startIndex)}
        {shineIt}
        {cumle.substring(endIndex)}
      </>
    );
  };

  return (
    <div
      className="flex items-center flex-col gap-7 p-6 
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
        <p className="text-gray-300/80 tracking-[0.25em] text-xs sm:text-sm">
          OYUN SONA ERDİ
        </p>
      </div>
      <div className="w-full flex justify-center py-1 border-y border-white/10 bg-white/2 overflow-hidden">
        <p className="uppercase text-base sm:text-xl text-gray-200 font-semibold tracking-[0.2em] leading-6">
          İSTATİSTİKLER
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2 w-full max-w-md mx-auto">
        <ScoreBoard score={score} />
      </div>
      {/* Puan */}
      <div
        className="flex flex-col items-center bg-linear-to-br from-indigo-600/20 to-purple-600/20
       px-2 py-3 sm:px-10 sm:py-4 rounded-4xl border border-indigo-400/20 shadow-sm"
      >
        <span className="text-xs sm:text-sm text-indigo-300/70 uppercase tracking-[0.3em] font-bold">
          Toplam skor
        </span>
        <p className="text-2xl sm:text-5xl tracking-wide font-rubik font-lack ">
          {totalPoints}
        </p>
      </div>
      <div className="grid grid-cols-[1fr_3fr] sm:grid-cols-[2fr_5fr] gap-2 sm:gap-3">
        <button
          onClick={BackToMenu}
          className="
            cursor-pointer group relative inline-flex items-center justify-center
            p-2 rounded-full bg-neutral-800 border border-white/10
            transition-all duration-300
            hover:bg-neutral-700 hover:border-white/20 active:scale-95
            "
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
      {ozetListesi.length > 0 && (
        <div className="w-full space-y-3 sm:space-y-5 mt-0 sm:mt-4 font-outfit">
          <p
            className={`text-white font-black tracking-tight text-sm sm:text-lg ml-1 
            after:block after:w-8 after:h-0.5 after:bg-indigo-500 after:mt-1`}
          >
            Soru Analizi
          </p>
          {ozetListesi.map((soru, index) => (
            <div
              key={index}
              className="w-full bg-white/5 border border-white/10 rounded-2xl 
            p-3 sm:p-6 flex flex-col gap-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-gray-400">Soru</span>
                  <span className="text-indigo-400 font-outfit text-[16px] ml-1">
                    {soru.soruSayisi}
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {soru.kelime}
                  </h4>
                </div>
                <div
                  className={`px-2 sm:px-4 py-0.5 sm:py-1 rounded-full text-xs font-bold border
                ${
                  soru.durum === "dogru"
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                    : soru.durum === "pas"
                      ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                      : "bg-red-500/20 text-red-400 border-red-400/40"
                }`}
                >
                  {qetQuestionStatus(soru.durum)}
                </div>
              </div>
              <p
                className={`
                text-gray-400 text-base sm:text-lg leading-relaxed border-l-2 border-white/20 pl-2 sm:pl-4
                `}
              >
                {gameMode === "classic"
                  ? soru.aciklama
                  : shineTheGap(soru.boslukDoldurma.cumle, soru.kelime)}
              </p>
              {gameMode === "fillgap" && (
                <div
                  className="flex items-center gap-2  font-medium 
                border-l-2 pl-2 my-2 border-indigo-500/50"
                >
                  {soru.boslukDoldurma.kaynak && ( //kaynak yoksa diye optional chaining
                    <>
                      <span className="text-slate-400 text-[12px] sm:text-[14px] ">
                        {soru.boslukDoldurma.kaynak}
                      </span>
                      <span className="text-slate-600">•</span>
                    </>
                  )}
                  {soru.boslukDoldurma?.cumleTuru && ( //bu veri her cumle için olsa da kontrol amaçlı optional chaining
                    <span className="bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded text-[10px] sm:text-[12px]">
                      {soru.boslukDoldurma.cumleTuru.toLocaleUpperCase("tr-TR")}
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-center gap-2  ">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs sm:text-sm text-slate-400 uppercase">
                  Alınan harf:
                  <b className=" font-black text-sky-400"> {soru.alinanHarf}</b>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
