import { useEffect, useRef, useState } from "react";
import type { TimerHandle } from "./components/Timer";
import { Timer } from "./components/Timer";
import Tippy from "@tippyjs/react";
import "./App.css";
import { CloseIcon, PassIcon } from "./components/Icons";
import { InfoTab } from "./components/InfoTab";
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
  const [gameList, setGameList] = useState<Kelime[]>([]);
  const [startGame, setStartGame] = useState(false);
  const [score, setScore] = useState({
    correct: 0,
    wrong: 0,
    takenWords: 0,
    pass: 5,
  });
  const totalPoints =
    score.correct * 10 - score.wrong * 5 - score.takenWords * 2;

  useEffect(() => {
    const loadWords = async () => {
      try {
        const res = await fetch("/kelimeler.json");

        if (!res.ok) throw new Error("JSON yüklenemedi");

        const json: KelimeData = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
      }
    };

    loadWords();
  }, []);

  useEffect(() => {
    if (!startGame || gameList.length === 0) return;

    const aktifKelime = gameList[currentIndex];

    if (aktifKelime) {
      setHarfler(Array(aktifKelime.kelime.length).fill(""));
      setSonuc("");
      // Input focus için ufak bir timeout (render beklemek için)
      setTimeout(() => inputRefs.current[0]?.focus(), 50);
    }
  }, [currentIndex, gameList, startGame]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const kelimeler = data!.kelimeler;
  //const aktifKelime = kelimeler[currentIndex];
  const aktifKelime = gameList[currentIndex] || null;
  if (!data) return <div className="text-white">Loading Data...</div>;

  const randomWords = (tumKelimeler: Kelime[]): Kelime[] => {
    return [...tumKelimeler].sort(() => 0.5 - Math.random()).slice(0, 10);
  };

  const StartTheGame = () => {
    if (!data) return;
    const chosenWords = randomWords(kelimeler);
    setGameList(chosenWords);
    setIndex(0);
    setStartGame(true);
    setGameEnd(false);
  };

  const NextQuestion = () => {
    if (currentIndex < gameList.length - 1) {
      setIndex((i) => i + 1);
    } else {
      setGameEnd(true);
    }
  };

  const kontrolEt = () => {
    if (!aktifKelime || sonuc === "Doğru!") return;
    const girilen = harfler.join("").toLowerCase();
    const dogru = aktifKelime.kelime.toLowerCase();
    if (girilen === dogru) {
      setSonuc("Doğru!");
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
      // 1 saniye bekleyip sonraki soruya geç (süre eklenirse kaldırılacak)
      setTimeout(NextQuestion, 1000);
    } else {
      setSonuc("Yanlış!");
      setScore((prev) => ({ ...prev, wrong: prev.wrong + 1 }));
    }
  };

  const harfVer = () => {
    if (!aktifKelime) return;
    //const bosIndex = harfler.findIndex((h) => h === ""); sıralı seçme. random seçmez
    const bosIndex = harfler
      .map((h, index) => (h === "" ? index : null)) //boş olup olmayan yerleri kontrol ettik
      .filter((index) => index !== null) as number[]; //boş ise sayı dizisine attık
    if (bosIndex.length > 0) {
      const randomSecim = bosIndex[Math.floor(Math.random() * bosIndex.length)];
      const yeniHarfler = [...harfler]; //harflerin lopyası oluşturuldu
      const alinanHarf = aktifKelime.kelime[randomSecim];
      yeniHarfler[randomSecim] = alinanHarf; //harfi yerleştirdik
      setHarfler(yeniHarfler); //güncelleme
      setSonuc(`${aktifKelime.kelime[randomSecim]} Harfi alındı`);
      inputRefs.current[randomSecim]?.focus(); //alınan harfe odaklanma sağlandı

      //Puan düşürme
      setScore((prev) => ({ ...prev, takenWords: prev.takenWords + 1 }));
    } else {
      setSonuc(`Alınacak harf kalmadı!`);
    }
  };

  const gaveUp = () => {
    if (score.pass > 0) {
      setScore((prev) => ({ ...prev, pass: prev.pass - 1 }));
      NextQuestion();
    } else {
      setSonuc("Pas hakkın kalmadı!");
      return;
    }
  };

  const RestartTheGame = () => {
    setIndex(0);
    setGameEnd(false);
    setSonuc("");
    setScore({ correct: 0, wrong: 0, takenWords: 0, pass: 5 });
    StartTheGame();
    /*     
    if (data) {
      const ilkKelimeUzunlugu = data.kelimeler[0].kelime.length;
      setHarfler(Array(ilkKelimeUzunlugu).fill(""));
    } */
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <InfoTab />
      {startGame ? (
        gameEnd ? (
          <GameOver
            onRestart={RestartTheGame}
            totalPoints={totalPoints}
            score={score}
          />
        ) : (
          <div
            className="p-4 sm:p-6 rounded-3xl sm:rounded-[3rem] 
             flex flex-col justify-between items-center gap-4 sm:gap-6 
             bg-white/5 backdrop-blur-md border border-white/10 
             w-[95vw] sm:w-[90vw] max-w-4xl 
             h-fit max-h-[92svh] sm:max-h-none
             shadow-2xl transition-all duration-300 mx-auto overflow-y-auto
             "
          >
            <div className="w-screen/2 sm:w-full text-center">
              <WordDescription aktifKelime={aktifKelime} />
            </div>
            <div className=" py-1 sm:py-4 flex justify-center">
              <WordInput
                key={`${currentIndex}-${gameEnd}`}
                setHarfler={setHarfler}
                harfler={harfler}
                inputRefs={inputRefs}
                onEnter={kontrolEt}
              />
            </div>

            <button
              onClick={harfVer}
              className="group relative uppercase px-4 sm:px-10 py-2 sm:py-3 rounded-full font-extrabold 
            cursor-pointer text-base sm:text-lg
               bg-white/5 backdrop-blur-sm border border-white/20 text-blue-400
               hover:bg-blue-500 hover:text-white hover:border-blue-400
               shadow-sm hover:shadow-[0_10px_20px_-10px_rgba(59,130,246,0.5)]
               transition-all duration-300 hover:-translate-y-1 active:scale-95"
            >
              <span className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-20 blur-md transition-opacity"></span>
              <span className="relative flex items-center gap-2">
                <span>Harf Al</span>
                <span className="text-blue-200 group-hover:rotate-12 transition-transform">
                  ✨
                </span>
              </span>
            </button>
            <div className="w-full flex justify-center py-2 border-y border-white/5 overflow-hidden">
              <div className="grid  grid-cols-4 gap-3 w-full max-w-md mx-auto">
                <ScoreBoard score={score} />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <button
                className="w-full sm:w-auto cursor-pointer px-10 py-3 rounded-full 
               text-white font-bold text-lg
                 bg-linear-to-r from-indigo-600 to-purple-600 uppercase
                 hover:from-indigo-500 hover:to-purple-500 text-[10px] sm:text-sm
                 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40
                 transition-all hover:scale-105 active:scale-95"
                onClick={kontrolEt}
              >
                Kontrol Et
              </button>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
                <button
                  onClick={gaveUp}
                  disabled={score.pass === 0}
                  className={`group flex items-center gap-3  py-2 sm:px-4 rounded-3xl
                   cursor-pointer font-black tracking-wider w-full sm:w-auto justify-center
                   bg-linear-to-r from-slate-200 to-slate-300 shadow-[0_4px_0_0_#B6C3D4] 
                   hover:from-slate-300 hover:to-slate-400 active:shadow-none active:translate-y-1 
                   transition-all duration-150 ease-in-out
                   ${score.pass === 0 ? "text-slate-400 opacity-50 cursor-not-allowed active:translate-y-0 active:shadow-[0_4px_0_0_#B6C3D4]" : "text-slate-700"}`}
                >
                  <div className="group-hover:translate-x-1 transition-transform duration-200">
                    <PassIcon />
                  </div>
                  <span>PAS</span>
                  <div
                    className={`flex items-center justify-center text-center
               rounded-lg px-2 py-1 text-[0.8em]
              ${score.pass === 0 ? "text-red-400 bg-red-500/20" : "text-white/80 bg-gray-500 "}`}
                  >
                    {score.pass}
                  </div>
                </button>
                <Tippy
                  arrow={false}
                  offset={[0, 10]}
                  content={
                    <span className="text-[12px] px-2 py-1 rounded shadow-xl bg-black">
                      Oyundan Çık
                    </span>
                  }
                >
                  <button
                    onClick={() => setGameEnd(true)}
                    className="cursor-pointer hover:scale-90 p-3 bg-red-500/10 border border-red-500/20 rounded-full hover:bg-red-500/20 transition-all"
                  >
                    <CloseIcon />
                  </button>
                </Tippy>
              </div>
            </div>
            {sonuc && (
              <p
                className={`text-xl sm:text-3xl mt-2 font-black tracking-widest animate-bounce
                   ${sonuc === "Doğru!" ? "text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" : "text-rose-500"}`}
              >
                {sonuc.toUpperCase()}
              </p>
            )}
          </div>
        )
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Kelime Oyunu</h1>
          <button
            className="px-12 py-4 bg-indigo-600 rounded-full font-bold text-xl hover:bg-indigo-500 transition-all shadow-xl"
            onClick={StartTheGame}
          >
            OYUNU BAŞLAT
          </button>
        </div>
      )}

      <div className="hidden">
        <Timer ref={timerRef} />
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
    </div>
  );
}

export default App;
