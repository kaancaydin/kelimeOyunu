interface Kelime {
  aciklama: string;
  kelime: string;
  harfSayisi: number;
  kelimeSayisi: number;
  koken: string;
}

interface Props {
  aktifKelime: Kelime;
}

import type { CluesProps } from "../types/elementTypes";

const Clues = ({ children, parent }: CluesProps) => {
  return (
    <div className="text-center">
      <span className="font-bold block text-[#A34BFF] uppercase tracking-widest text-[12px]">
        {parent}
      </span>
      <p className=" capitalize font-medium text-gray-200 text-sm sm:text-xl ">
        {children}
      </p>
    </div>
  );
};

export const WordDescription = ({ aktifKelime }: Props) => {
  if (!aktifKelime) {
    return (
      <div className="min-h-20 flex items-center justify-center italic text-gray-500">
        Soru hazırlanıyor...
      </div>
    );
  }
  return (
    <div className="relative w-full px-4 sm:px-10 py-3 sm:py-6 text-center italic text-gray-200">
      <span className="absolute top-0 left-4 text-3xl sm:text-6xl text-indigo-500/20 font-serif">
        “
      </span>
      <div className="w-full flex items-center justify-center px-2 sm:px-6 min-h-20 sm:min-h-37.5">
        <p className="text-lg sm:text-3xl font-medium leading-relaxed tracking-tight text-center italic text-gray-200 wrap-break-word">
          {aktifKelime.aciklama}
        </p>
      </div>
      <span className="absolute bottom-0 right-4 text-3xl sm:text-6xl text-indigo-500/20 font-serif">
        ”
      </span>
      <div className="flex justify-center items-center gap-4 sm:gap-8 ">
        <Clues parent="Uzunluk"> {`${aktifKelime.harfSayisi} Harf`} </Clues>
        <div className="w-px h-8 bg-white/10" />
        <Clues parent="Köken"> {aktifKelime.koken} </Clues>
        <div className="w-px h-8 bg-white/10" />
        <Clues parent="YAPI"> {`${aktifKelime.kelimeSayisi} Kelime`} </Clues>
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
