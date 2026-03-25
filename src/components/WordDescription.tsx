import type { Kelime } from "../types/wordTypes";
import type { GameMode } from "../types/reducerTypes";

interface Props {
  aktifKelime: Kelime;
  density: "normal" | "medium" | "compact";
  gameMode: GameMode | null;
}

import type { CluesProps } from "../types/elementTypes";

const Clues = ({ children, color, className }: CluesProps) => {
  return (
    <div 
    //design change
    //bg-linear-to-r from-white/5 to-transparent text-white font-medium
      className={`inline-flex  justify-center text-center
        items-center rounded-full shrink-0
        transition-all overflow-hidden ${color}  
        ring-3 shadow-[0_0_4px_currentColor] not-italic
        capitalize font-medium font-sora  text-zinc-800
        text-[9px] sm:text-base px-2 py-1 sm:px-3 sm:py-1.5 
        w-max whitespace-nowrap
        ${className}
        `}
    >
      {children}
    </div>
  );
};

export const WordDescription = ({
  aktifKelime,
  density = "normal",
  gameMode,
}: Props) => {
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

  //boşluk doldurmada kelimeyi gizlemek için
  const maskele = (cumle: string, kelime: string) => {
    if (!cumle || !kelime) return "";

    const maskKelime = kelime.toLocaleUpperCase("tr-TR");
    const maskCumle = cumle.toLocaleUpperCase("tr-TR");

    // kelime içinde varmı kontrolü
    if (!maskCumle.includes(maskKelime)) return cumle;

    // cümle içindeki indexi bulma
    const startIndex = maskCumle.indexOf(maskKelime);
    const endIndex = startIndex + maskKelime.length;

    // maskele
    const mask = (
      <span className="inline-flex gap-0.5 sm:gap-1 mx-1 align-middle">
        {Array.from({ length: kelime.length }).map((_, i) => (
          <span
            key={i}
            className="w-5 h-6 sm:w-8 sm:h-9 border border-white/5 border-b-2 border-b-indigo-500/80 bg-indigo-500/20 shadow-[0_2px_8px_-4px_rgba(99,102,241,0.3)]
            flex items-center justify-center rounded-md text-transparent select-none"
          >
            _
          </span>
        ))}
      </span>
    );

    return (
      <>
        {cumle.substring(0, startIndex)}
        {mask}
        {cumle.substring(endIndex)}
      </>
    );
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
          cursor-default select-none italic text-gray-200 -mb-2
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
          {gameMode === "classic"
            ? aktifKelime.aciklama
            : maskele(
                aktifKelime.boslukDoldurma.cumle,
                aktifKelime.kelime,
              )}{" "}
        </p>
      </div>
      <span className="absolute bottom-7 sm:bottom-13 right-3 text-4xl sm:text-6xl text-indigo-500/20 font-serif">
        ”
      </span>
      <div className="flex justify-center items-center gap-6 mt-2">
        <Clues color="bg-violet-400 ring-violet-800/80">
        {`${gameMode === "fillgap" ? aktifKelime.boslukDoldurma.cumleTuru : aktifKelime.kelimeTuru}`}
        </Clues>
        <Clues color="bg-cyan-400 ring-cyan-800/80">{aktifKelime.koken}</Clues>
        <Clues color="bg-green-400 ring-green-800/80 ">{`${aktifKelime.harfSayisi} Harf`}</Clues>
        <Clues color="bg-rose-400 ring-rose-800/80">
          {`${aktifKelime.kelimeSayisi} Kelime`}
        </Clues>
      </div>
    </div>
  );
};

/* const mask = (
  <span className="relative inline-block mx-1.5 px-2 py-0.5 align-baseline">
    <span className="font-mono tracking-[0.3em] text-indigo-400/90 font-bold">
      {"_".repeat(kelime.length)}
    </span>

    <span className="absolute inset-0 bg-indigo-500/10 backdrop-blur-[1px] rounded border border-indigo-500/20 -z-10" />
    
    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-500/40 rounded-full" />
  </span>
); */
