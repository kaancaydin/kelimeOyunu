import type { Props, ScoreStatsProps } from "../types/propTypes";
import { CorrectIcon, WrongIcon, HintIcon, PassIcon } from "./Icons";

const ScoreStats = ({
  children,
  parent,
  className,
  colors,
}: ScoreStatsProps) => {
  return (
    <div
      className={`bg-white/5  backdrop-blur-md border border-white/10 px-3 py-1.5 sm:px-4 sm:py-2
                   rounded-3xl text-center shadow-xl gap-1 sm:gap-2 flex  items-center justify-center 
                   ${colors}`}
    >
      <p
        className={`text-base sm:text-2xl font-black font-rubik cursor-default select-none  ${className}`}
      >
        {children}
      </p>
      <p>{parent}</p>
    </div>
  );
};

export const ScoreBoard = ({ score }: Props) => {
  return (
    <>
      <ScoreStats colors="text-green-400" parent={<CorrectIcon />}>
        {score.correct}
      </ScoreStats>
      <ScoreStats colors="text-red-400" parent={<WrongIcon />}>
        {score.wrong}
      </ScoreStats>
      <ScoreStats colors="text-blue-400" parent={<HintIcon />}>
        {score.takenWords}
      </ScoreStats>
      <ScoreStats colors="text-white" parent={<PassIcon />}>
        {5 - score.pass} 
      </ScoreStats>
    </>
  );
};

const InGameScoreStats = ({
  children,
  className,
  colors,
  parent,
  animate,
}: ScoreStatsProps) => {
  return (
    <>
      <div
        className={`flex items-center gap-1 sm:gap-1.5 px-1.5 py-0  sm:px-3 sm:py-1.5 rounded-full
        border-b-2 transition-all overflow-hidden
          ${colors} ${className}`}
      >
        <span
          key={children}
          className={`text-lg sm:text-2xl font-bold tracking-tight cursor-default select-none ${animate}`}
        >
          {children}
        </span>
        <span className="opacity-80 relative top-px [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-6 sm:[&>svg]:h-6">
          {parent}
        </span>
      </div>
    </>
  );
};

export const InGameScoreBoard = ({ score, sonuc }: Props) => {
  const getBannerStyle = (sonuc: string | null) => {
    switch (sonuc) {
      case "Doğru!":
        return "bg-emerald-600 border-emerald-400 animate-morph-glow";
      case "Süre doldu, Yanlış!":
        return "bg-rose-600  border-rose-400";
      case "Bir daha dene!":
        return "bg-orange-500  border-orange-300";
      case "Zaman durduğunda PAS YAPAMAZSIN":
      case "Pas hakkın kalmadı!":
      case "Zaman durduğunda harf alamazsınız!":
      case "Harf vermek için yer yok!":
        return "bg-red-800 border-red-600";
      default:
        return "bg-blue-500  border-blue-300 ";
    }
  };

  return (
    <div
      className="relative flex items-center text-center justify-center w-full max-w-100 h-14 
    mx-auto overflow-hidden rounded-2xl"
    >
      {/*  MORPHING BANNER  */}
      <div
        className={`
        absolute inset-0 z-50 flex items-center justify-center border-t-2  text-white
        transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1)
        
        ${
          sonuc
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        }
        ${sonuc ? getBannerStyle(sonuc) : ""}
      `}
      >
        {sonuc && (
          <div className="flex items-center gap-3 px-4">
            <span className="text-white font-black italic tracking-widest text-base sm:text-lg shimmer-text uppercase">
              {sonuc}
            </span>
            {/*isCorrect && (
              <span className="text-yellow-300 animate-bounce text-xl">⭐</span>
            )*/}
          </div>
        )}
      </div>

      <div
        className={`
        flex gap-2 sm:gap-4 transition-all duration-700 
        ${sonuc ? "-translate-y-full opacity-0 blur-sm" : "translate-y-0 opacity-100 blur-0"}
      `}
      >
        <InGameScoreStats
          colors="bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
          children={score.correct}
          parent={<CorrectIcon />}
        />
        <InGameScoreStats
          colors="bg-rose-500/10 text-rose-600 border-rose-500/30"
          children={score.wrong}
          parent={<WrongIcon />}
        />
        <InGameScoreStats
          colors="bg-cyan-500/10 text-cyan-600 border-cyan-500/30"
          children={score.takenWords}
          parent={<HintIcon />}
        />
      </div>
    </div>
  );
};

/* const sizeClasses = {
    normal: "gap-2 px-2 py-1 text-lg sm:text-2xl [&>svg]:w-6 [&>svg]:h-6",
    medium: "gap-1.5 px-1.5 py-0.5 text-base sm:text-xl [&>svg]:w-5 [&>svg]:h-5",
    compact: "gap-1 px-1 py-0 text-sm sm:text-lg [&>svg]:w-4 [&>svg]:h-4",
  }; */