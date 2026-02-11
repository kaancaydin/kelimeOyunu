import { ScoreBoard } from "../components/ScoreBoard";
import { WordDescription } from "../components/WordDescription";
import { WordInput } from "../components/WordInput";
import { CloseIcon, PassIcon } from "../components/Icons";
import Tippy from "@tippyjs/react";

export const MainGame = () => {
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

      <button
        onClick={harfVer}
        className="group relative uppercase px-4 sm:px-10 py-2 sm:py-3 rounded-full font-extrabold 
            cursor-pointer text-base sm:text-lg
               bg-white/5 backdrop-blur-sm border border-white/20 text-blue-400
               hover:bg-blue-500 hover:text-white hover:border-blue-400
               shadow-sm hover:shadow-[0_10px_20px_-10px_rgba(59,130,246,0.5)]
               transition-all duration-300 hover:-translate-y-1 active:scale-95"
      >
        <span className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-20 blur-md transition-opacity"></span>
        <span className="relative flex items-center gap-2">
          <span>Harf Al</span>
          <span className="text-blue-200 group-hover:rotate-12 transition-transform">
            ✨
          </span>
        </span>
      </button>
      <div className="w-full flex justify-center py-2 border-y border-white/5 overflow-hidden">
        <div className="grid  grid-cols-4 gap-3 w-full max-w-md mx-auto">
          <ScoreBoard score={score} />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
        <button
          className="w-full sm:w-auto cursor-pointer px-10 py-3 rounded-full 
               text-white font-bold text-lg
                 bg-linear-to-r from-indigo-600 to-purple-600 uppercase
                 hover:from-indigo-500 hover:to-purple-500 text-[10px] sm:text-sm
                 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40
                 transition-all hover:scale-105 active:scale-95"
          onClick={kontrolEt}
        >
          Kontrol Et
        </button>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
          <button
            onClick={gaveUp}
            disabled={score.pass === 0}
            className={`group flex items-center gap-3  py-2 sm:px-4 rounded-3xl
                   cursor-pointer font-black tracking-wider w-full sm:w-auto justify-center
                   bg-linear-to-r from-slate-200 to-slate-300 shadow-[0_4px_0_0_#B6C3D4] 
                   hover:from-slate-300 hover:to-slate-400 active:shadow-none active:translate-y-1 
                   transition-all duration-150 ease-in-out
                   ${score.pass === 0 ? "text-slate-400 opacity-50 cursor-not-allowed active:translate-y-0 active:shadow-[0_4px_0_0_#B6C3D4]" : "text-slate-700"}`}
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
          </button>
          <Tippy
            arrow={false}
            offset={[0, 10]}
            content={
              <span className="text-[12px] px-2 py-1 rounded shadow-xl bg-black">
                Oyundan Çık
              </span>
            }
          >
            <button
              onClick={() => setGameEnd(true)}
              className="cursor-pointer hover:scale-90 p-3 bg-red-500/10 border border-red-500/20 rounded-full hover:bg-red-500/20 transition-all"
            >
              <CloseIcon />
            </button>
          </Tippy>
        </div>
      </div>
      {sonuc && (
        <p
          className={`text-xl sm:text-3xl mt-2 font-black tracking-widest animate-bounce
                   ${sonuc === "Doğru!" ? "text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" : "text-rose-500"}`}
        >
          {sonuc.toUpperCase()}
        </p>
      )}
    </div>
  );
};
