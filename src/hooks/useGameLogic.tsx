import type { KelimeData, Kelime } from "../types/wordTypes";
import type { TimerModeProps } from "../types/propTypes";
import { useEffect, useState, useRef, useCallback } from "react";
import { getTheme } from "../utils/getTheme";
import type { KeyboardTheme } from "../virtualKeyboard/KeyboardPalettes";
import type { SoruOzeti } from "../types/kayitType";

export const useGameLogic = () => {
  const [data, setData] = useState<KelimeData | null>(null);
  const [harfler, setHarfler] = useState<string[]>([]);
  const [currentIndex, setIndex] = useState<number>(0);
  const [sonuc, setSonuc] = useState<string>("");
  const [gameEnd, setGameEnd] = useState(false);
  const [gameList, setGameList] = useState<Kelime[]>([]);
  const [startGame, setStartGame] = useState(false);
  const [zaman, setZaman] = useState(180);
  const keyboardProgress = useRef(false);
  const [theme, setTheme] = useState<KeyboardTheme>(() => getTheme());
  const [charIndex, setCharIndex] = useState<number>(0); // sanal klavye için //v-keyboard
  const [ozetListesi, setOzetListesi] = useState<SoruOzeti[]>([]);
  const [takenWordsPQ, setTakenWordsPQ] = useState<number>(0);
  const [score, setScore] = useState({
    correct: 0,
    wrong: 0,
    takenWords: 0,
    pass: 5,
  });

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const timerRef = useRef<number | null>(null);
  const [extraTimer, setExtraTimer] = useState<number>(15);
  const [timerMode, setTimerMode] = useState<TimerModeProps>("pause");

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

  const NextQuestion = useCallback(
    (durum: "dogru" | "yanlis" | "pas") => {
      if (aktifKelime) {
        const yeniKayit: SoruOzeti = {
          soruSayisi: currentIndex + 1,
          kelime: aktifKelime.kelime,
          aciklama: aktifKelime.aciklama,
          durum: durum,
          alinanHarf: takenWordsPQ
        };
        setOzetListesi((prev) => [...prev, yeniKayit]);
      }

      setIndex((prev) => {
        if (prev < gameList.length - 1) {
          setExtraTimer(15);
          setTimerMode("main");
          setTakenWordsPQ(0);
          return prev + 1;
        } else {
          setGameEnd(true);
          return prev;
        }
      });
    },
    [gameList.length, aktifKelime, takenWordsPQ, currentIndex],
  );

  //Timers

  useEffect(() => {
    //useEffect veriyi hafızada tutar
    if (timerMode !== "main") return;
    timerRef.current = window.setInterval(() => {
      setZaman((prev) => {
        if (prev <= 1) {
          setTimerMode("pause");
          setGameEnd(true);
          return 0;
        }
        return prev - 1;
      }); //buton odaklı zaman yerine durum bazlı zaman kontrolü yapmayı sağlar.
    }, 1000);
    return () => {
      if (timerRef.current) {
        //timerRef.current !== null
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [timerMode]); //Sadece isTimerActive değiştiğinde bu kutuyu(useEffect'i) çalıştır

  useEffect(() => {
    if (timerMode !== "extra") return;
    if (extraTimer === 0) {
      setScore((prev) => ({ ...prev, wrong: prev.wrong + 1 }));

      setSonuc("Süre doldu, Yanlış!");
      setTimerMode("pause");
      setTimeout(() => {
        NextQuestion("yanlis");
        setSonuc("");
      }, 500);

      return; //süre doldu, diğer soruya geçer, süreyi sıfırlar ve cevap yoksa yanlış sayar
    }
    const timeout = setTimeout(() => {
      setExtraTimer((prev) => {
        return prev - 1;
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [extraTimer, timerMode, NextQuestion]);

  //theme
  useEffect(() => {
    localStorage.setItem("keyboardTheme", theme);
  }, [theme]);

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
    if (!data) return;
    const kelimeler = data.kelimeler;
    const levels = [5, 6, 7, 8, 9, 10]; //harfleri seç
    const pool = levels.flatMap((len) => {
      const group = shuffle(kelimeler.filter((k) => k.harfSayisi === len)); //her harfi gruplara eşletşir
      return group.slice(0, 3); //5er soru sor
    });
    setGameList(pool);
    setIndex(0);
    setStartGame(true);
    setGameEnd(false);
    setSonuc("");
    setTimerMode("main");
    setExtraTimer(15);
    setZaman(180);
    setOzetListesi([])
  };

  const kontrolEt = () => {
    if (
      !aktifKelime ||
      sonuc === "Doğru!" ||
      keyboardProgress.current ||
      harfler.includes("")
    )
      return;
    const girilen = harfler.join("").toLocaleUpperCase("tr-TR");
    const dogru = aktifKelime.kelime.toLocaleUpperCase("tr-TR");

    keyboardProgress.current = true;
    if (girilen === dogru) {
      setSonuc("Doğru!");
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
      // 1 saniye bekleyip sonraki soruya geç (süre eklenirse kaldırılacak)
      setTimeout(() => {
        NextQuestion("dogru");
        keyboardProgress.current = false;
      }, 600);
    } else {
      setSonuc("Bir daha dene!");
      //setScore((prev) => ({ ...prev, wrong: prev.wrong + 1 })); yanlış sadece extra süre biterse
      setTimeout(() => {
        setSonuc("");
        keyboardProgress.current = false;
      }, 800);
    }
  };

  const harfVer = () => {
    if (!aktifKelime) return;
    if (timerMode === "extra") {
      setTimeout(() => {
        setSonuc(`Zaman durduğunda harf alamazsınız!`);
      }, 50);
      setTimeout(() => {
        setSonuc("");
      }, 1000);

      return;
    }
    const bosIndex = harfler
      .map((h, index) => (h === "" ? index : null)) //boş olup olmayan yerleri kontrol ettik
      .filter((index) => index !== null) as number[]; //boş ise sayı dizisine attık
    if (bosIndex.length > 0) {
      const randomSecim = bosIndex[Math.floor(Math.random() * bosIndex.length)];
      const yeniHarfler = [...harfler]; //harflerin lopyası oluşturuldu
      const alinanHarf =
        aktifKelime.kelime[randomSecim].toLocaleUpperCase("tr-TR");
      yeniHarfler[randomSecim] = alinanHarf; //harfi yerleştirdik
      setHarfler(yeniHarfler); //güncelleme
      setTimeout(() => {
        setSonuc(`${aktifKelime.kelime[randomSecim]} Harfi alındı`);
      }, 50);
      setTimeout(() => {
        setSonuc("");
      }, 1000);
      inputRefs.current[randomSecim]?.focus(); //alınan harfe odaklanma sağlandı
      if (inputRefs.current[randomSecim]) {
        inputRefs.current[randomSecim].disabled = true;
      }
      //Puan düşürme
      setScore((prev) => ({ ...prev, takenWords: prev.takenWords + 1 }));
      setTakenWordsPQ((prev) => prev + 1); //kelime bası alınan harf sayısı
    } else {
      /* NextQuestion('dogru')
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 })); */
      setTimeout(() => {
        setSonuc(`Alınacak harf kalmadı!`);
      }, 50);
      setTimeout(() => {
        setSonuc("");
      }, 1500);
    }
  };

  const gaveUp = () => {
    if (timerMode === "extra") {
      setSonuc("");
      setTimeout(() => {
        setSonuc(`Zaman durduğunda PAS YAPAMAZSIN`);
      }, 50);
      setTimeout(() => {
        setSonuc("");
      }, 1000);
      return;
    }
    if (score.pass > 0) {
      setScore((prev) => ({ ...prev, pass: prev.pass - 1 }));
      NextQuestion("pas");
    } else {
      setTimeout(() => {
        setSonuc(`Pas hakkın kalmadı!`);
      }, 50);
      setTimeout(() => {
        setSonuc("");
      }, 1000);
      return;
    }
  };

  const RestartTheGame = () => {
    setScore({ correct: 0, wrong: 0, takenWords: 0, pass: 5 });
    StartTheGame();
  };

  //VirtualKeyboard

  const handleVirtualKey = (key: string) => {
    if (!aktifKelime) return;

    setHarfler((prev) => {
      const yeniHarfler = [...prev]; //kopayası alındı

      if (key === "SİL") {
        if (inputRefs.current[charIndex]?.disabled) return yeniHarfler;

        if (yeniHarfler[charIndex] !== "") {
          yeniHarfler[charIndex] = "";
          setTimeout(() => inputRefs.current[charIndex]?.focus(), 10);
        } else if (charIndex > 0) {
          const mesafe = inputRefs.current
            .slice(0, charIndex)
            .reverse()
            .findIndex((input) => input && !input.disabled);
          if (mesafe !== -1) {
            const hedefIndex = charIndex - 1 - mesafe;
            yeniHarfler[hedefIndex] = "";
            setTimeout(() => inputRefs.current[hedefIndex]?.focus(), 10);
          }
        }
        return yeniHarfler;
      } else if (key === "ENTER") {
        if (sonuc !== "Doğru!") {
          kontrolEt();
        }
      } else {
        if (!inputRefs.current[charIndex]?.disabled) {
          yeniHarfler[charIndex] = key.toLocaleUpperCase("tr-TR");

          const sonrakiMesafe = inputRefs.current
            .slice(charIndex + 1)
            .findIndex((input) => input && !input.disabled);

          if (sonrakiMesafe !== -1) {
            const hedefIndex = charIndex + 1 + sonrakiMesafe;
            setTimeout(() => inputRefs.current[hedefIndex]?.focus(), 10); //veya setCharIndex(hedefIndex)
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
      theme,
      charIndex,
      extraTimer,
      timerMode,
      ozetListesi
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
      handleVirtualKey,
      setTheme,
      setCharIndex,
      setExtraTimer,
      setTimerMode,
    },
    refs: { inputRefs },
  };
};
