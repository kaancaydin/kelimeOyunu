interface Props {
  currentIndex: number;
}

export const QuestionCounter = ({ currentIndex }: Props) => {
  return (
<p
  className="
  absolute top-1.5 left-1/2 -translate-x-1/2
  flex items-center gap-2
  px-1.5 py-0
  sm:px-2 sm:py-0.5
  rounded-full
  bg-neutral-900/70
  border border-white/10
  backdrop-blur-sm
  animate-[scaleIn_0.25s_ease-out] font-sora
  "
>
  <span className="text-[8px] sm:text-[12px]  text-gray-500 tracking-[0.25em]">
    SORU
  </span>

  <span className="text-[10px] sm:text-[16px] font-black text-indigo-400">
    {currentIndex + 1}
  </span>
</p>
  );
};
