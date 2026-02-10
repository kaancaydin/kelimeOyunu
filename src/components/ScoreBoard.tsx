interface ScoreProps {
  correct: number;
  wrong: number;
}

interface Props {
  score: ScoreProps;
  className?: string;
}

export const ScoreBoard = ({ score }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-3xl text-center shadow-xl">
        <p className="text-green-400 text-3xl font-black">{score.correct}</p>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
          Doğru
        </p>
      </div>
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-3xl text-center shadow-xl">
        <p className="text-red-400 text-3xl font-black">{score.wrong}</p>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
          Yanlış
        </p>
      </div>
    </div>
  );
};
