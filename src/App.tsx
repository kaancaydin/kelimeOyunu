import { useEffect, useRef, useState } from "react";
import type { TimerHandle } from "./components/Timer";
import { Timer } from "./components/Timer";
import Tippy from "@tippyjs/react";
import "./App.css";
import { CloseIcon } from "./components/CloseIcon";
import { WordInput } from "./components/WordInput";
import { GameOver } from "./components/GameOver";
import { ScoreBoard } from "./components/ScoreBoard";
import { WordDescription } from "./components/WordDescription";

type Kelime = {
  aciklama: string;
  kelime: string;
  harfSayisi: number;
  kelimeSayisi: number;
  koken: string;
};

type KelimeData = {
  kelimeler: Kelime[];
};

function App() {
  const timerRef = useRef<TimerHandle>(null);
  const [data, setData] = useState<KelimeData | null>(null);
  const [harfler, setHarfler] = useState<string[]>([]);
  const [currentIndex, setIndex] = useState<number>(0);
  const [sonuc, setSonuc] = useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [gameEnd, setGameEnd] = useState(false);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const totalPoints = score.correct * 10 + score.wrong * 5;

  // const [inputValue, setInputValue] = useState<string>("");
  // const [aktifGrup, setGrup] = useState<"5harfliler" | "6harfliler">("5harfliler")
  // const [aciklama, setAciklama] = useState<string>("")
  /*   const [dogruSayisi, setDogruSayisi] = useState(0);
  const [yanlisSayisi, setYanlisSayisi] = useState(0); */

  useEffect(() => {
    fetch("/kelimeler.json")
      .then((res) => res.json())
      .then((data: KelimeData) => {
        setData(data);
        // 👉 data GELDİĞİ ANDA inputları ayarla
        setHarfler(Array(data.kelimeler[currentIndex].kelime.length).fill(""));
        inputRefs.current[0]?.focus();
      });
  }, [currentIndex]);

  if (!data) {
    return <div>Loading...</div>;
  }
  const kelimeler = data!.kelimeler;
  const aktifKelime = kelimeler[currentIndex];

  function kontrolEt() {
    const girilen = harfler.join("").toLowerCase();
    const dogru = aktifKelime.kelime.toLowerCase();
    setSonuc(girilen === dogru ? "Doğru!" : "Yanlış!");
    if (girilen === dogru) {
      /* setDogruSayisi(prev => prev + 1); */
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      /* setYanlisSayisi(prev => prev + 1); */
      setScore((prev) => ({ ...prev, wrong: prev.wrong + 1 }));
    }
    if (currentIndex === kelimeler.length - 1) {
      setGameEnd(true);
      return;
    }
    setIndex(currentIndex + 1);
    console.log("aktif kelime:", aktifKelime.kelime);
    console.log("harfler uzunluk:", harfler.length);
  }

  const RestartTheGame = () => {
    setIndex(0);
    setGameEnd(false);
    setSonuc("");
    setHarfler([]);
    inputRefs.current = [];
    setScore({ correct: 0, wrong: 0 });

    if (data) {
      const ilkKelimeUzunlugu = data.kelimeler[0].kelime.length;
      setHarfler(Array(ilkKelimeUzunlugu).fill(""));
    }
  };

  return (
    <>
      {gameEnd ? (
        <GameOver
          onRestart={RestartTheGame}
          totalPoints={totalPoints}
          score={score}
        />
      ) : (
        <div
          className="p-8 rounded-[3rem] flex flex-col justify-center items-center gap-6 
             bg-white/5 backdrop-blur-md border border-white/10 
             w-[90vw] max-w-225 min-h-150 shadow-2xl transition-all duration-300 mx-auto"
        >
          <WordDescription aktifKelime={aktifKelime} />
          <WordInput
            key={`${currentIndex}-${gameEnd}`}
            setHarfler={setHarfler}
            harfler={harfler}
            inputRefs={inputRefs}
            onEnter={kontrolEt}
          />
          <button className="uppercase px-10 py-3 rounded-full font-extrabold cursor-pointer text-lg
          bg-linear-to-bl from-blue-600 to-blue-500 text-white">
            Harf Al
          </button>
          <div className="w-full flex justify-center py-2 border-y border-white/5">
            <ScoreBoard score={score} />
          </div>

          <div className="flex items-center gap-4">
            <button
              className="cursor-pointer px-10 py-3 rounded-full text-white font-bold text-lg
                 bg-linear-to-r from-indigo-600 to-purple-600 uppercase
                 hover:from-indigo-500 hover:to-purple-500
                 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40
                 transition-all hover:scale-105 active:scale-95"
              onClick={kontrolEt}
            >
              Kontrol Et
            </button>
            <Tippy
              arrow={false}
              offset={[0, -80]}
              content={
                <span className="text-[12px] px-2 py-1 rounded shadow-xl font-medium bg-black">
                  Oyundan Çık
                </span>
              }
            >
              <button
                onClick={() => setGameEnd(true)}
                className=" cursor-pointer hover:scale-90
                p-3 bg-red-500/10 border border-red-500/20 rounded-full hover:bg-red-500/20 transition-colors"
              >
                <CloseIcon />
              </button>
            </Tippy>
          </div>
          <div className=" overflow-hidden"></div>
          {sonuc && (
            <p
              className={`text-3xl font-black tracking-widest animate-bounce 
         ${sonuc === "Doğru!" ? "text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" : "text-rose-500"}`}
            >
              {sonuc.toUpperCase()}
            </p>
          )}
        </div>
      )}

      <Timer ref={timerRef} />
      <div className="hidden">
        {kelimeler.map((item, index) => (
          <ul
            className="flex justify-center items-center flex-col gap-8 p-5
                bg-white/10 backdrop-blur-xl border border-white/20 
                rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] 
                w-[60vw] max-w-225 min-h-20
                transition-all duration-500 hover:shadow-indigo-500/20"
          >
            <li key={index}>
              <b>{item.kelime}</b> - {item.aciklama} - Harf : {item.harfSayisi}{" "}
              - Köken : {item.koken}
              {/* <p>{item.kelime.split("")[0]}</p> */}
            </li>
          </ul>
        ))}
      </div>
    </>
  );
}

export default App;
