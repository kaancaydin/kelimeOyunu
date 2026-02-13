interface Props {
    currentIndex : number
}

export const QuestionCounter = ({currentIndex}: Props) => {
  return (
    <p
      className="fixed top-2 left-1/2 -translate-x-1/2
            px-3 py-1
            text-xs sm:text-sm font-bold tracking-wide
            rounded-full
            bg-white/10 backdrop-blur
            ring-3 ring-blue-400/30
            text-white
            shadow-md animate-[scaleIn_0.25s_ease-out]"
    >
      Soru : <span className="text-blue-300 ">{currentIndex + 1}</span>
    </p>
  );
};
