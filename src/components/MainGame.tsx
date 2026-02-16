import { InGameScoreBoard } from "../components/ScoreBoard";
import { WordDescription } from "../components/WordDescription";
import { WordInput } from "../components/WordInput";
import { CloseIcon, PassIcon } from "../components/Icons";
import { GameButton } from "../elementStyles/GameButtons";
import type { GameLogicType } from "../types/GameLogicTypes";
import { Timer } from "./Timer";
import { VirtualKeyboard } from "../virtualKeyboard/VirtualKeyboard";
import { QuestionCounter } from "./QuestionCounter";
import eye from "../assets/animations/Eye.json";
import Lottie from "lottie-react";

interface MainGameProps {
  state: GameLogicType["state"];
  actions: GameLogicType["actions"];
  refs: GameLogicType["refs"];
}

export const MainGame = ({ state, actions, refs }: MainGameProps) => {
  const {
    aktifKelime,
    currentIndex,
    gameEnd,
    harfler,
    score,
    sonuc,
    zaman,
    theme,
    isTimerActive,
  } = state;
  const {
    setHarfler,
    setCharIndex,
    kontrolEt,
    harfVer,
    gaveUp,
    setGameEnd,
    setIsTimerActive,
    handleVirtualKey,
  } = actions;
  const { inputRefs } = refs;

  const harfSayisi = harfler.length;
  const density =
    harfSayisi <= 6 ? "normal" : harfSayisi <= 8 ? "medium" : "compact";

  return (
    <div className="flex flex-col gap-5 overflow-x-hidden">
      <div
        className="p-4 sm:p-6 rounded-3xl sm:rounded-[3rem] 
             flex flex-col justify-between items-center gap-4 sm:gap-6 
             bg-white/1 border border-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]
             w-[95vw] sm:w-[90vw] max-w-4xl 
             h-fit max-h-[92svh] sm:max-h-none
              transition-all duration-300 mx-auto overflow-y-auto
             "
      >
        {/* soru sayacı */}
        <QuestionCounter currentIndex={currentIndex} />

        <GameButton
          variant="close"
          onClick={() => setGameEnd(true)}
          tippyTitle="Oyundan Çık"
        >
          <CloseIcon />
        </GameButton>

        <div className="w-screen/2 mt-2 sm:w-full text-center">
          <WordDescription aktifKelime={aktifKelime} density={density} />
        </div>
        <div>
          <Timer
            zaman={zaman}
            setTimer={setIsTimerActive}
            timerActivate={isTimerActive}
          />
        </div>
        <div className=" py-1 sm:py-4 flex justify-center">
          <WordInput
            key={`${currentIndex}-${gameEnd}`}
            setHarfler={setHarfler}
            harfler={harfler}
            inputRefs={inputRefs}
            onEnter={kontrolEt}
            density={density}
            setCharIndex={setCharIndex}
          />
        </div>
        <div className="flex gap-2">
          <GameButton variant="checkSmall" onClick={kontrolEt}>
            <Lottie
              animationData={eye}
              loop
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
          </GameButton>
          <GameButton
            variant="clue"
            onClick={harfVer}
            className="w-fit flex flex-1 items-center justify-center gap-1.5 mx-auto"
          >
            <span className="leading-none">Harf Al</span>
            <span className="text-sm group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
              ✨
            </span>
          </GameButton>
          <GameButton
            variant="pass"
            className="flex-1"
            onClick={gaveUp}
            disabled={score.pass === 0}
            ternaryOp={
              score.pass === 0
                ? "text-slate-400 opacity-50 cursor-not-allowed active:translate-y-0 active:shadow-[0_4px_0_0_#B6C3D4]"
                : "text-slate-700"
            }
          >
            <div className="shrink-0 group-hover:translate-x-1 transition-transform duration-200">
              <PassIcon />
            </div>
            <span>PAS</span>
            <div
              className={`flex items-center justify-center text-center  font-rubik
               rounded-lg py-px px-1 sm:px-1.5 sm:py-0.5 text-[0.8em] font-bold
              ${score.pass === 0 ? "text-red-400 bg-red-500/20" : "text-white/80 bg-gray-500 "}`}
            >
              {score.pass}
            </div>
          </GameButton>
        </div>

        <div className="flex gap-3">
          <InGameScoreBoard score={score}  />
        </div>

        <div className=" hidden flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <GameButton
            variant="check"
            onClick={kontrolEt}
            children={"Kontrol Et"}
          />
          <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
            <GameButton
              variant="pass"
              className="hidden"
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
          </div>
        </div>
        <p
          className={`text-xl hidden sm:text-3xl mt-2 font-black tracking-widest
    ${
      sonuc === "Doğru!"
        ? "text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.6)] animate-[bounce_2s_infinite]"
        : "text-rose-500 animate-[shake_0.5s_ease-in-out]" /* Yanlışsa titresin */
    }`}
        >
          {sonuc.toUpperCase()}
        </p>
      </div>
      <VirtualKeyboard onKey={handleVirtualKey} theme={theme} />
    </div>
  );
};
