interface Props {
  currentIndex: number;
}

export const QuestionCounter = ({ currentIndex }: Props) => {
  return (
    <p
      className={`
        fixed top-2 left-1/2 -translate-x-1/2
        font-bold tracking-wide
        rounded-full ring-white/20
        bg-white/10 backdrop-blur
        text-white shadow-md animate-[scaleIn_0.25s_ease-out]
        px-1.5 py-px ring-2 text-[10px] sm:text-base
      `}
    >
      Soru : <span className="text-blue-300 ">{currentIndex + 1}</span>
    </p>
  );
};
