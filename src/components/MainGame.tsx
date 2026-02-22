import { InGameScoreBoard } from "../components/ScoreBoard";
import { WordDescription } from "../components/WordDescription";
import { WordInput } from "../components/WordInput";
import { CloseIcon, PassIcon } from "../components/Icons";
import { GameButton } from "../elementStyles/GameButtons";
import type { GameLogicType } from "../types/GameLogicTypes";
import { Timer } from "./Timer";
import { VirtualKeyboard } from "../virtualKeyboard/VirtualKeyboard";
import { QuestionCounter } from "./QuestionCounter";

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
    extraTimer,
    timerMode,
    jokerIndexes
  } = state;
  const {
    updateHarf,
    deleteHarf,
    setCharIndex,
    harfVer,
    gaveUp,
    handleVirtualKey,
    QuitTheGame,
    PauseTheGame,
  } = actions;
  const { inputRefs } = refs;

  const harfSayisi = harfler.length;
  const density =
    harfSayisi <= 6 ? "normal" : harfSayisi <= 8 ? "medium" : "compact";

  return (
    <div className="flex flex-col gap-5 overflow-x-hidden relative">
      <div
        className="p-4 sm:p-6 rounded-3xl sm:rounded-[3rem] 
             flex flex-col justify-between items-center gap-4 sm:gap-6 
             bg-gray-900 border border-white/10 
             w-[95vw] sm:w-[90vw] max-w-4xl 
             h-fit max-h-[92svh] sm:max-h-none
               mx-auto overflow-y-auto 
             "
      >
        {/* soru sayacı */}
        <QuestionCounter currentIndex={currentIndex} />

        <GameButton
          variant="close"
          onClick={QuitTheGame}
        >
          <CloseIcon />
        </GameButton>

        <div className="w-screen/2 mt-2 sm:w-full text-center">
          <WordDescription aktifKelime={aktifKelime} density={density} />
        </div>
        <div>
          <Timer
            zaman={zaman}
            onPause={PauseTheGame}
            extraTimer={extraTimer}
            timerMode={timerMode}
          />
        </div>
        <div className=" py-1 sm:py-4 flex justify-center">
          <WordInput
            key={`${currentIndex}-${gameEnd}`}
            updateHarf={updateHarf}
            deleteHarf={deleteHarf}
            harfler={harfler}
            inputRefs={inputRefs}
            //onEnter={kontrolEt(harfler, jokerIndexes)}
            density={density}
            setCharIndex={setCharIndex}
            jokerIndexes={jokerIndexes}
            aktifKelime={aktifKelime}
            sonuc={sonuc}
          />
        </div>
        <div className="flex gap-2">
          <GameButton
            variant="clue"
            onClick={harfVer}
            disabled={timerMode === "extra"}
            className="w-fit flex flex-1 items-center justify-center gap-1.5 mx-auto
            disabled:opacity-50 disabled:pointer-events-none"
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
            disabled={score.pass === 0 || timerMode === "extra"}
            ternaryOp={
              score.pass === 0 || timerMode === "extra"
                ? "text-slate-400 opacity-50 disabled:pointer-events-none active:translate-y-0 active:shadow-[0_4px_0_0_#B6C3D4]"
                : "text-slate-700"
            }
          >
            <div className="shrink-0group-hover:translate-x-1 transition-transform duration-200">
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

        <InGameScoreBoard score={score} sonuc={sonuc} />


      </div>
      <VirtualKeyboard onKey={handleVirtualKey} theme={theme} />
    </div>
  );
};
