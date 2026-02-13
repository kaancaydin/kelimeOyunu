import type { KelimeData, Kelime } from "../types/wordTypes";
import { useEffect, useState, useRef } from "react";

export const useGameLogic = () => {
  const [data, setData] = useState<KelimeData | null>(null);
  const [harfler, setHarfler] = useState<string[]>([]);
  const [currentIndex, setIndex] = useState<number>(0);
  const [sonuc, setSonuc] = useState<string>("");
  const [gameEnd, setGameEnd] = useState(false);
  const [gameList, setGameList] = useState<Kelime[]>([]);
  const [startGame, setStartGame] = useState(false);
  const [zaman, setZaman] = useState(180);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const [score, setScore] = useState({
    correct: 0,
    wrong: 0,
    takenWords: 0,
    pass: 5,
  });

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const timerRef = useRef<number | null>(null);

  const aktifKelime = gameList[currentIndex] || null;

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

  // const [aktifGrup, setGrup] = useState<"5harfliler" | "6harfliler">("5harfliler")

  useEffect(() => {
    if (!startGame || gameList.length === 0) return;

    if (aktifKelime) {
      setHarfler(Array(aktifKelime.kelime.length).fill(""));
      setSonuc("");
      // Input focus için ufak bir timeout (render beklemek için)
      setTimeout(() => inputRefs.current[0]?.focus(), 50);
    }
  }, [currentIndex, aktifKelime, gameList.length, startGame]);

  /* if (!data) {
    return <div>Loading...</div>;
  } */

  /* const kelimeler = data!.kelimeler;
  const harf5 = kelimeler.filter((h) => h.harfSayisi === 5); //5 harfli kelimeler
  const harf6 = kelimeler.filter((h) => h.harfSayisi === 6); //5 harfli kelimeler */
  //const aktifKelime = kelimeler[currentIndex]; 

  //Timers

  useEffect(() => { //useEffect veriyi hafızada tutar
    if (isTimerActive) {
      timerRef.current = window.setInterval(() => {
        setZaman((prev) => {
          if (prev <= 1) {
            setIsTimerActive(false);
            setGameEnd(true);
            return 0;
          }
          return prev - 1;
        }); //buton odaklı zaman yerine durum bazlı zaman kontrolü yapmayı sağlar.
      }, 1000);
    }
    return () => {
      if (timerRef.current) { //timerRef.current !== null
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isTimerActive]); //Sadece isTimerActive değiştiğinde bu kutuyu(useEffect'i) çalıştır

  const pauseTimer = () => {
    setIsTimerActive(!isTimerActive);
  };

  const randomWords = (tumKelimeler: Kelime[]): Kelime[] => {
    return [...tumKelimeler].sort(() => 0.5 - Math.random()).slice(0, 10); //soru havuzundan 10 soru seçtik
  };

  const StartTheGame = () => {
    if (!data) return;
    //const chosenWords = randomWords(kelimeler); tüm kelimeler
    const kelimeler = data.kelimeler;
    const harf5 = kelimeler.filter((h) => h.harfSayisi === 5); //5 harfli kelimeler
    const harf6 = kelimeler.filter((h) => h.harfSayisi === 6); //5 harfli kelimeler
    //const aktifKelime = kelimeler[currentIndex];
    const list5 = randomWords(harf5).slice(0, 5); //5 harfliler seçildi
    const list6 = randomWords(harf6).slice(0, 5); //6 harfliler seçildi
    const birlesikListe = [...list5, ...list6]; //farklı soru havuzlarından listeler birleştirildi, spread operatörü ile
    setGameList(birlesikListe);
    setIndex(0);
    setStartGame(true);
    setGameEnd(false);
    setIsTimerActive(true);
    setZaman(180);
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
    setIsTimerActive(true);
  };

  const harfVer = () => {
    if (!aktifKelime) return;
    //const bosIndex = harfler.findIndex((h) => h === ""); sıralı seçme. random seçmez
    if (!isTimerActive) {
      setSonuc(`Zaman durduğunda harf alamazsınız!`);
      return;
    }
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
    if (!isTimerActive) {
      setSonuc(`Zaman durduğunda PAS YAPAMAZSIN.`);
      return;
    }
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

  return {
    state: {
      data,
      harfler,
      currentIndex,
      sonuc,
      gameEnd,
      gameList,
      startGame,
      score,
      totalPoints,
      aktifKelime,
      zaman,
    },
    actions: {
      setHarfler,
      StartTheGame,
      kontrolEt,
      harfVer,
      gaveUp,
      setGameEnd,
      setStartGame,
      RestartTheGame,
      setZaman,
      pauseTimer,
    },
    refs: { inputRefs },
  };
};
