import type { Props, ScoreStatsProps } from "../types/propTypes";
import { CorrectIcon, WrongIcon, HintIcon } from "./Icons";

const ScoreStats = ({
  children,
  parent,
  className,
  colors,
}: ScoreStatsProps) => {
  return (
    <div
      className="bg-white/5  backdrop-blur-md border border-white/10 p-3 sm:p-5
     rounded-3xl text-center shadow-xl gap-1 flex flex-col items-center justify-around"
    >
      <p
        className={`text-xl sm:text-2xl font-black font-rubik cursor-default select-none ${colors} ${className}`}
      >
        {children}
      </p>
      <p
        className="text-gray-400 text-sm sm:text-xl font-bold font-rubik uppercase  sm:tracking-widest tracking-wide
        leading-tight text-center wrap-break-word"
      >
        {parent}
      </p>
    </div>
  );
};

export const ScoreBoard = ({ score }: Props) => {
  return (
    <>
      <ScoreStats colors="text-green-400" parent="DOĞRU">
        {score.correct}
      </ScoreStats>
      <ScoreStats colors="text-red-400" parent="Yanlış">
        {score.wrong}
      </ScoreStats>
      <ScoreStats colors="text-blue-400" parent="Kullanılan İpucu">
        {score.takenWords}
      </ScoreStats>
      <ScoreStats colors="text-white" parent="kalan PAS HAKKI">
        {score.pass}
      </ScoreStats>
    </>
  );
};

const InGameScoreStats = ({
  children,
  className,
  colors,
  parent,
  animate
}: ScoreStatsProps) => {
  return (
    <>
      <div
        className={`flex items-center gap-1 sm:gap-1.5 px-1.5 py-0  sm:px-3 sm:py-1.5 rounded-full
        transition-all overflow-hidden
          ${colors} ${className}`}
      >
        <span
          key={children}
         className={`text-lg sm:text-2xl font-bold tracking-tight cursor-default select-none ${animate}`}>
          {children}
        </span>
        <span className="opacity-80 relative top-px [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-6 sm:[&>svg]:h-6">
          {parent}
        </span>
      </div>
    </>
  );
};

export const InGameScoreBoard = ({ score }: Props) => {

  return (
    <>
      <InGameScoreStats
        colors="bg-emerald-500/10 text-emerald-600 shadow-[inset_0_0_0_1px_rgba(34,197,94,0.3)]"
        children={score.correct} 
        parent={<CorrectIcon />}
        animate="animate-[pop_0.2s_ease-out]"
      />
      <InGameScoreStats
        colors="bg-rose-500/10 text-rose-600 ring-1 ring-rose-500/30"
        children={score.wrong} 
        parent={<WrongIcon />}
        animate="animate-[pop-down_0.2s_ease-out]"
      />
      <InGameScoreStats
        colors="bg-cyan-500/10 text-cyan-600 ring-1 ring-cyan-500/30 "
        children={score.takenWords} 
        parent={<HintIcon />}
        animate="animate-[pop-fade_0.2s_ease-out]"
      />

      {/*       <div>
        {score.pass} oyun içinde zaten butonda gözüktüğü için minimal bi tasarım amacıyla bu kısım kaldırıldı
      </div> */}
    </>
  );
};
