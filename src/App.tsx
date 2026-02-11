//import { Timer } from "./components/Timer";
import Tippy from "@tippyjs/react";
import "./App.css";
import { CloseIcon, PassIcon } from "./components/Icons";
import { InfoTab } from "./components/InfoTab";
import { WordInput } from "./components/WordInput";
import { GameOver } from "./components/GameOver";
import { ScoreBoard } from "./components/ScoreBoard";
import { WordDescription } from "./components/WordDescription";
import { GameStart } from "./components/GameStart";
import { GameButton } from "./components/GameButtons";
import { useGameLogic } from "./hooks/useGameLogic";

function App() {
  const { state, actions, refs } = useGameLogic();
  if (!state.data) {
    return <div className="p-3">Loading....</div>;
  }
  const {
    startGame,
    gameEnd,
    score,
    aktifKelime,
    currentIndex,
    harfler,
    sonuc,
    totalPoints,
  } = state;

  const {
    StartTheGame,
    RestartTheGame,
    gaveUp,
    kontrolEt,
    harfVer,
    setHarfler,
    setGameEnd,
  } = actions;

  const { inputRefs } = refs;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <InfoTab />
      {startGame ? (
        gameEnd ? (
          <GameOver
            onRestart={RestartTheGame}
            totalPoints={totalPoints}
            score={score}
          />
        ) : (
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

            {/* <button
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
            </button> */}
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
              {/* <button
                className="w-full sm:w-auto cursor-pointer px-10 py-3 rounded-full 
               text-white font-bold text-lg
                 bg-linear-to-r from-indigo-600 to-purple-600 uppercase
                 hover:from-indigo-500 hover:to-purple-500 text-[10px] sm:text-sm
                 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40
                 transition-all hover:scale-105 active:scale-95"
                onClick={kontrolEt}
              >
                Kontrol Et
              </button> */}
              <GameButton
                variant="check"
                onClick={kontrolEt}
                children={"Kontrol Et"}
              />
              <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
                {/*                  <button
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
                </button>   */}
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
                  {/* <button
                    onClick={() => setGameEnd(true)}
                    className="cursor-pointer hover:scale-90 p-3 bg-red-500/10 border border-red-500/20 rounded-full hover:bg-red-500/20 transition-all"
                  >
                    <CloseIcon />
                  </button> */}
                  <GameButton variant="close" onClick={() => setGameEnd(true)}>
                    <CloseIcon />{" "}
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
        )
      ) : (
        <GameStart onStart={StartTheGame} />
      )}

{/*       <div className="hidden">
        <Timer ref={timerRef} />
        {kelimeler.map((item, index) => (
          <ul
            className="flex justify-center items-center flex-col gap-8 p-5
                bg-white/10 backdrop-blur-xl border border-white/20 
                rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] 
                w-[60vw] max-w-225 min-h-20
                transition-all duration-500 hover:shadow-indigo-500/20"
          >
            <li key={index}>
              <b>{item.kelime}</b> - {item.aciklama} - Harf : {item.harfSayisi}{" "}
              - Köken : {item.koken}
            </li>
          </ul>
        ))}
      </div> */}
    </div>
  );
}

export default App;
