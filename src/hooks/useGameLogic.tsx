import type { KelimeData, Kelime } from "../types/wordTypes";
import { useEffect, useState, useRef } from "react";
import { getTheme } from "../utils/getTheme";
import type { KeyboardTheme } from "../virtualKeyboard/KeyboardPalettes";

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
  const keyboardProgress = useRef(false);
  const [theme, setTheme] = useState<KeyboardTheme>(() => getTheme())

  const [score, setScore] = useState({
    correct: 0,
    wrong: 0,
    takenWords: 0,
    pass: 30,
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
        //await new Promise(r => setTimeout(r, 500)); loading ekranı için
        setData(json);
      } catch (err) {
        console.error(err);
      }
    };

    loadWords();
  }, []);

  useEffect(() => {
    if (!startGame || gameList.length === 0) return;

    if (aktifKelime) {
      setHarfler(Array(aktifKelime.kelime.length).fill(""));
      setSonuc("");
      // Input focus için ufak bir timeout (render beklemek için)
      setTimeout(() => inputRefs.current[0]?.focus(), 50);
    }
  }, [currentIndex, aktifKelime, gameList.length, startGame]);

  //Timers

  useEffect(() => {
    //useEffect veriyi hafızada tutar
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
      if (timerRef.current) {
        //timerRef.current !== null
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isTimerActive]); //Sadece isTimerActive değiştiğinde bu kutuyu(useEffect'i) çalıştır

  //theme
  useEffect(()=>{
    localStorage.setItem("keyboardTheme",theme)
  },[theme])


  /*   const randomWords = (tumKelimeler: Kelime[]): Kelime[] => {
    return [...tumKelimeler].sort(() => 0.5 - Math.random()).slice(0, 10); //soru havuzundan 10 soru seçtik
  }; */

  function shuffle<T>(arr: T[]) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const StartTheGame = () => {
    //const chosenWords = randomWords(kelimeler); tüm kelimeler
    //const harf5 = kelimeler.filter((h) => h.harfSayisi === 5); //5 harfli kelimeler
    //const harf6 = kelimeler.filter((h) => h.harfSayisi === 6); //5 harfli kelimeler
    //const aktifKelime = kelimeler[currentIndex];
    //const list5 = randomWords(harf5).slice(0, 5); //5 harfliler seçildi
    //const list6 = randomWords(harf6).slice(0, 5); //6 harfliler seçildi
    //const birlesikListe = [...list5, ...list6]; //farklı soru havuzlarından listeler birleştirildi, spread operatörü ile
    if (!data) return;
    const kelimeler = data.kelimeler;
    const levels = [5,6,7,8,9,10,11,12]; //harfleri seç
    const pool = levels.flatMap((len) => {
      const group = shuffle(kelimeler.filter((k) => k.harfSayisi === len)); //her harfi gruplara eşletşir
      return group.slice(0, 5); //5er soru sor
    });
    setGameList(pool);
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
    if (!aktifKelime || sonuc === "Doğru!" || keyboardProgress.current || harfler.includes("")) return;
    const girilen = harfler.join("").toLocaleUpperCase("tr-TR");
    const dogru = aktifKelime.kelime.toLocaleUpperCase("tr-TR");

    keyboardProgress.current = true;
    if (girilen === dogru) {
      setSonuc("Doğru!");
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
      // 1 saniye bekleyip sonraki soruya geç (süre eklenirse kaldırılacak)
      setTimeout(() => {
        NextQuestion();
        keyboardProgress.current = false;
      }, 1000);
    } else {
      setSonuc("Yanlış!");
      setScore((prev) => ({ ...prev, wrong: prev.wrong + 1 }));
      setTimeout(() => {
        keyboardProgress.current = false;
      }, 500);
    }
    setIsTimerActive(true);
  };

  const harfVer = () => {
    if (!aktifKelime) return;
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
      const alinanHarf = aktifKelime.kelime[randomSecim].toLocaleUpperCase('tr-TR');
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
    setScore({ correct: 0, wrong: 0, takenWords: 0, pass: 30 });
    StartTheGame();
  };

  //VirtualKeyboard

  const handleVirtualKey = (key: string) => {
    if (!aktifKelime) return;

    setHarfler((prev) => {
      const yeniHarfler = [...prev]; //kopayası alındı

      if (key === "SİL") {
        for (let i = yeniHarfler.length - 1; i >= 0; i--) {
          if (yeniHarfler[i] !== "") {
            yeniHarfler[i] = "";
            inputRefs.current[i]?.focus();
            break;
          }
        }
      } else if (key === "ENTER") {
        if (sonuc !== "Doğru!") {
          kontrolEt();
        }
      } else {
        const bosIndex = yeniHarfler.findIndex((h) => h === "");
        if (bosIndex !== -1) {
          yeniHarfler[bosIndex] = key.toLocaleUpperCase("tr-TR");
          if (bosIndex + 1 < yeniHarfler.length) {
            inputRefs.current[bosIndex + 1]?.focus();
          }
        }
      }
      return yeniHarfler;
    });
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
      isTimerActive,
      theme
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
      setIsTimerActive,
      handleVirtualKey,
      setTheme
    },
    refs: { inputRefs },
  };
};
