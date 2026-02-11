import { PlayIcon } from "./Icons";

interface Props {
  onStart: () => void;
}

export const GameStart = ({ onStart }: Props) => {
  const handleStart = () => {
    setTimeout(() => {
      onStart();
    }, 400);
  };

  return (
    <div className=" text-center ">
      <h1
        className="text-center uppercase font-black mb-8 font-cinzel flex flex-col items-center
        animate-[float_6s_ease-in-out_infinite] cursor-default select-none group-hover:shadow-[0_0_20px_6px_rgba(99,102,241,1)]
        motion-reduce:animate-none
        "
      >
        <span
          className="
            text-6xl 
            text-white /* Yazı rengi net beyaz olsun */
            font-black 
            tracking-wider
            /* Gölgeyi 'drop-shadow' yerine 'text-shadow' gibi veya daha kontrollü veriyoruz */
            drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] /* Harf kenarlarını belirginleştiren sert gölge */
            relative
          "
        >
          KELİME
          {/* Yazının arkasındaki yumuşak mor parlama (Aura) */}
          <span className="absolute inset-0 blur-2xl bg-indigo-500/30 -z-10 animate-pulse"></span>
        </span>
        <span className="text-4xl font-bold  tracking-[0.25em] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          Oyunu
        </span>
        <div className="relative w-24 h-px bg-linear-to-r from-transparent via-indigo-500 to-transparent mt-4 overflow-hidden">
          {/* sweep */}
          <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent animate-[sweep_3s_linear_infinite]" />

          {/* particles */}
          <span className="absolute left-6 top-0 w-0.5 h-0.5 bg-indigo-300 rounded-full animate-[sparkle_2s_ease-in-out_infinite]" />
          <span className="absolute right-6 top-0 w-0.5 h-0.5 bg-indigo-300 rounded-full animate-[sparkle_3s_ease-in-out_infinite]" />

          {/* center orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-300 shadow-[0_0_12px_4px_rgba(99,102,241,0.8)] animate-pulse" />
        </div>
      </h1>
      <button
        onClick={handleStart}
        className="
          relative group
          flex items-center justify-center gap-3
          px-12 py-4
          uppercase cursor-pointer
          rounded-full
          font-satoshi font-black text-xl tracking-widest
          transition-all duration-300
          active:scale-95
          p-0.75 
          overflow-hidden
        "
      >
        {/* Dönen RGB Işık Katmanı */}
        <span
          className="
            absolute -inset-full
            bg-[conic-gradient(from_0deg,transparent_0%,#6366f1_10%,#4f46e5_25%,#818cf8_40%,transparent_55%)]
            animate-spin-slow
            blur-sm /* Işığı biraz daha dağıtır, daha doğal durur */
          "
        />

        {/* İç Katman: Transparanlık burada sağlanıyor */}
        <span
          className="
            absolute inset-0.5 
            rounded-full 
            bg-slate-900/80 /* %80 şeffaf - Arka planı tamamen silebilirsin ama yazı okunsun diye hafif ton iyidir */
            backdrop-blur-md /* Cam efekti için */
          "
        />

        {/* İçerik */}
        <div className="relative z-10 flex items-center gap-3 text-white">
          <div className="transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-2 group-active:translate-x-37.5 group-active:opacity-0">
            <PlayIcon />
          </div>
          <span className="group-active:translate-x-2 transition-transform duration-300">
            oyunu başlat
          </span>
        </div>
      </button>
    </div>
  );
};
