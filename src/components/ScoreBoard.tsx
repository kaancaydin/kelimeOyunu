import type { Props, ScoreStatsProps } from "../types/propTypes";


const ScoreStats = ({
  children,
  parent,
  className,
  colors,
}: ScoreStatsProps) => {
  return (
    <div className="bg-white/5  backdrop-blur-md border border-white/10 p-3  h-28 rounded-3xl text-center shadow-xl flex flex-col items-center justify-around">
      <p className={`text-3xl font-black ${colors} ${className}`}>{children}</p>
      <p
        className="text-gray-400 text-[10px] sm:text-sm font-bold uppercase  sm:tracking-widest tracking-wide
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
        <ScoreStats colors="text-white" parent="KULLANILAN PAS HAKKI">
          {score.pass}
        </ScoreStats>
    </>
  );
};

/*
w-full flex justify-center py-2 border-y border-white/5
*/
