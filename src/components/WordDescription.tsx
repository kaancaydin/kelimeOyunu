interface Kelime {
  aciklama: string;
  kelime: string;
  harfSayisi: number;
  kelimeSayisi: number;
  koken: string;
  kelimeTuru: string;
}

interface Props {
  aktifKelime: Kelime;
  density: "normal" | "medium" | "compact";
}

import type { CluesProps } from "../types/elementTypes";

const Clues = ({ children, color, className }: CluesProps) => {
  return (
    <div
      className={`items-center rounded-full
        transition-all overflow-hidden ${color}  
        bg-linear-to-r from-transparent to-white/5 
        ring-1 shadow-[0_0_4px_currentColor] not-italic
        capitalize font-light text-gray-200 font-sora
        text-[10px] sm:text-base px-1 py-px sm:px-3 sm:py-1.5
        ${className}
        `}
    >
      {children}
    </div>
  );
};

export const WordDescription = ({ aktifKelime, density = "normal" }: Props) => {
  const descSize = {
    normal: "min-h-20 sm:min-h-37.5",
    medium: "min-h-18 sm:min-h-32",
    compact: "min-h-16 sm:min-h-28",
  };

  const textSize = {
    normal: "text-base sm:text-3xl",
    medium: "text-base sm:text-3xl",
    compact: "text-sm sm:text-3xl",
  };

  if (!aktifKelime) {
    return (
      <div className="min-h-20 flex items-center justify-center italic text-gray-500">
        Soru hazırlanıyor...
      </div>
    );
  }
  return (
    <div
      className={`relative w-full px-4 sm:px-10 py-3 sm:py-6 text-center transition-all duration-300 ease-out
          cursor-default select-none italic text-gray-200
      ${descSize[density]}
    `}
    >
      <span className="absolute top-0 left-3 text-4xl sm:text-6xl text-indigo-500/20 font-serif">
        “
      </span>
      <div className="w-full flex items-center justify-center px-2 sm:px-6 min-h-20 sm:min-h-37.5">
        <p
          className={`font-medium leading-relaxed font-sora tracking-tight text-center text-gray-200
            ${textSize[density]}`}
        >
          {aktifKelime.aciklama}
        </p>
      </div>
      <span className="absolute bottom-7 sm:bottom-13 right-3 text-4xl sm:text-6xl text-indigo-500/20 font-serif">
        ”
      </span>
      <div className="flex justify-center items-center gap-6 mt-2">
        <Clues color="ring-indigo-400/80">{`${aktifKelime.kelimeTuru}`}</Clues>
        <Clues color="ring-emerald-400/80">{aktifKelime.koken}</Clues>
        <Clues color="ring-sky-400/80">{`${aktifKelime.harfSayisi} Harf`}</Clues>
        <Clues color="ring-amber-400/80">
          {`${aktifKelime.kelimeSayisi} Kelime`}
        </Clues>
      </div>
    </div>
  );
};

/* yedek tasarım
<div className="flex justify-center gap-4 flex-wrap">
  <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium">
    {aktifKelime.harfSayisi} Harf
  </span>
  <span className="px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium capitalize">
    {aktifKelime.koken}
  </span>
  <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium">
    {aktifKelime.kelimeSayisi} Kelime
  </span>
</div>
*/
