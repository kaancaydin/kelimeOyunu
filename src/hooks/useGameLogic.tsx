import type { KelimeData } from "../types/wordTypes";
import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useReducer,
  useMemo,
} from "react";
import { getTheme } from "../utils/getTheme";
import type { KeyboardTheme } from "../virtualKeyboard/KeyboardPalettes";
import type { SoruOzeti } from "../types/kayitType";
import { gameReducer, initialState } from "./gameReducer";

export const useGameLogic = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const {
    currentIndex,
    //sonuc,
    //gameEnd,
    gameList,
    startGame,
    timerMode,
    score,
    takenWordsPQ,
    jokerIndexes,
  } = state;

  const [data, setData] = useState<KelimeData | null>(null);
  const [harfler, setHarfler] = useState<string[]>([]);
  const keyboardProgress = useRef(false);
  const [theme, setTheme] = useState<KeyboardTheme>(() => getTheme());
  const [charIndex, setCharIndex] = useState<number>(0); // sanal klavye için //v-keyboard
  const [zaman, setZaman] = useState(210);
  const [extraTimer, setExtraTimer] = useState(15);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const timerRef = useRef<number | null>(null);

  const aktifKelime = gameList[currentIndex] || null;

  const totalPoints = useMemo(() => {
    //memo sayesinde her renderda yeniden hesaplanmıyor, verimli
    return score.correct * 10 - score.wrong * 5 - score.takenWords * 2;
  }, [score.correct, score.wrong, score.takenWords]);

  useEffect(() => {
    const loadWords = async () => {
      try {
        const res = await fetch("/kelimeler.json");

        if (!res.ok) throw new Error("JSON yüklenemedi");

        const json: KelimeData = await res.json();
        const upperWords = json.kelimeler.map((k) => ({
          ...k,
          kelime: k.kelime.toLocaleUpperCase("tr-TR"),
        }));
        //await new Promise(r => setTimeout(r, 500)); loading ekranı için
        setData({ ...json, kelimeler: upperWords });
      } catch (err) {
        console.error(err);
      }
    };

    loadWords();
  }, []);

  useEffect(() => {
    if (!startGame || gameList.length === 0) return;

    if (aktifKelime) {
      const harfBosalt = Array(aktifKelime.kelime.length).fill("");
      //dispatch({ type: "SET_SONUC", payload: "" });
      setHarfler(harfBosalt);
      // Input focus için ufak bir timeout (render beklemek için)
      requestAnimationFrame(() => {
        inputRefs.current[0]?.focus();
      });
    }
  }, [currentIndex, aktifKelime, gameList.length, startGame]);

  const NextQuestion = useCallback(
    (durum: "dogru" | "yanlis" | "pas") => {
      if (!aktifKelime) return;

      const yeniKayit: SoruOzeti = {
        soruSayisi: currentIndex + 1,
        kelime: aktifKelime.kelime,
        aciklama: aktifKelime.aciklama,
        durum: durum,
        alinanHarf: takenWordsPQ,
      };
      setExtraTimer(15);
      dispatch({ type: "NEXT_QUESTION", yeniKayit });
    },
    [aktifKelime, takenWordsPQ, currentIndex],
  );

  const kontrolEt = useCallback(
    (guncelHarfler: string[], guncelJokerler: number[]) => {
      // 1. Güvenlik Kontrolleri (Parametre üzerinden)
      if (
        !aktifKelime ||
        keyboardProgress.current ||
        guncelHarfler.includes("")
      )
        return;

      const girilen = guncelHarfler.join("").toLocaleUpperCase("tr-TR");
      const dogru = aktifKelime.kelime;

      keyboardProgress.current = true;

      if (girilen === dogru) {
        // DOĞRU CEVAP
        dispatch({ type: "CEVAP", payload: "dogru" });
        setTimeout(() => {
          NextQuestion("dogru");
          keyboardProgress.current = false;
        }, 400);
      } else {
        // YANLIŞ CEVAP
        dispatch({ type: "CEVAP", payload: "tekrar" });
        setTimeout(() => {
          dispatch({ type: "SET_SONUC", payload: "" });
        }, 1000);
        // Jokerli harfleri koru, diğerlerini boşalt
        const noJoker = guncelHarfler.map((harf, index) =>
          guncelJokerler.includes(index) ? harf : "",
        );
        const emptyWord = noJoker.findIndex((h) => h === "");

        setTimeout(() => {
          //dispatch({ type: "SET_HARFLER", payload: noJoker });
          setHarfler(noJoker);
          keyboardProgress.current = false;

          if (emptyWord !== -1) {
            requestAnimationFrame(() => {
              inputRefs.current[emptyWord]?.focus();
            });
          }
        }, 800);
      }
    },
    [NextQuestion, aktifKelime],
  );

  //timers
  useEffect(() => {
    if (timerMode !== "main") return;
    timerRef.current = window.setInterval(() => {
      setZaman((prev) => {
        if (prev <= 1) {
          dispatch({ type: "QUIT_GAME" });
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
  }, [timerMode]);
  useEffect(() => {
    if (timerMode !== "extra") return;
    if (extraTimer === 0) {
      dispatch({ type: "CEVAP", payload: "yanlis" });

      setTimeout(() => {
        NextQuestion("yanlis");
      }, 500);

      return; //süre doldu, diğer soruya geçer, ektra süreyi sıfırlar ve cevap yoksa yanlış sayar
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

  const getRandomItems = <T,>(arr: T[], count: number): T[] => {
    const result = new Array(count);
    const len = arr.length;

    // Eğer havuzda istenen sayıdan az kelime varsa hepsini dön
    if (count >= len) return shuffle(arr);

    const taken = new Set<number>(); // Seçilenleri işaretle ki aynı kelime gelmesin
    let i = 0;

    while (i < count) {
      const randomIndex = Math.floor(Math.random() * len);
      if (!taken.has(randomIndex)) {
        result[i] = arr[randomIndex];
        taken.add(randomIndex);
        i++;
      }
    }
    return result;
  };
  const StartTheGame = () => {
    if (!data) return;
    const kelimeler = data.kelimeler;
    const levels = [5, 6, 7, 8, 9, 10]; //harfleri seç
    const pool = levels.flatMap((len) => {
      // 1. Önce sadece o uzunluktaki kelimeleri filtrele (Hızlıdır)
      const filtered = kelimeler.filter((k) => k.harfSayisi === len);

      // 2. Bütün listeyi karıştırmak yerine içinden rastgele 3 tane seç
      return getRandomItems(filtered, 3);
    });
    dispatch({ type: "START_GAME", payload: pool });
    setZaman(210);
    setExtraTimer(15);
    //dispatch({ type: "SET_SONUC", payload: "" });
  };

  const harfVer = () => {
    if (!aktifKelime || timerMode === "extra") {
      if (timerMode === "extra") {
        /* dispatch({
          type: "SET_SONUC",
          payload: "Zaman durduğubnda harf alamazsınız!",
        }); */
        /* setTimeout(() => {
          dispatch({ type: "SET_SONUC", payload: "" });
        }, 1000); */
        //not in use for test
      }
      return;
    }
    const bosIndex = harfler
      .map((h, index) => (h === "" ? index : null)) //boş olup olmayan yerleri kontrol ettik
      .filter((index) => index !== null) as number[]; //boş ise sayı dizisine attık

    if (bosIndex.length > 0) {
      const randomSecim = bosIndex[Math.floor(Math.random() * bosIndex.length)];
      const alinanHarf = aktifKelime.kelime[randomSecim];
      const guncelHarfler = [...harfler];
      guncelHarfler[randomSecim] = alinanHarf;
      setHarfler(guncelHarfler);
      dispatch({
        type: "HARF_VER",
        payload: { index: randomSecim },
      });

      if (!guncelHarfler.includes("")) {
        setTimeout(() => {
          kontrolEt(guncelHarfler, jokerIndexes); //alınan son harfa göre oto kontrol
        }, 0);
      } else {
        const focusOnEmpty = harfler.findIndex(
          (h, i) => h === "" && i !== randomSecim, //boş ve müsait olan ilk yere focus at
        );
        if (focusOnEmpty !== -1) {
          requestAnimationFrame(() => {
            inputRefs.current[focusOnEmpty]?.focus(); //en baştaki boş inputa focus at
          });
        }
      }
    }
  };

  const gaveUp = () => {
    if (timerMode === "extra") {
      /* dispatch({
        type: "SET_SONUC",
        payload: "Zaman durduğunda PAS YAPAMAZSIN",
      }); */
      //setTimeout(() => dispatch({ type: "SET_SONUC", payload: "" }), 1000);
      return;
    }
    if (score.pass > 0) {
      dispatch({ type: "CEVAP", payload: "pas" });
      setTimeout(() => {
        NextQuestion("pas");
      }, 400);
    } else {
      //dispatch({ type: "SET_SONUC", payload: "Pas hakkın kalmadı!" });
      //setTimeout(() => dispatch({ type: "SET_SONUC", payload: "" }), 1000);
    }
  };

  const QuitTheGame = () => {
    dispatch({ type: "QUIT_GAME" });
  };

  const PauseTheGame = useCallback(() => {
    dispatch({ type: "SET_TIMER_MODE", payload: "extra" });
  }, []);

  const BackToMenu = () => {
    dispatch({ type: "BACK_MENU" });
  };

  //VirtualKeyboard
  const handleVirtualKey = (key: string) => {
    if (!aktifKelime) return;

    const yeniHarfler = [...harfler];

    if (key === "SİL") {
      if (inputRefs.current[charIndex]?.disabled) return;
      if (yeniHarfler[charIndex] !== "") {
        yeniHarfler[charIndex] = "";
        //setTimeout(() => inputRefs.current[charIndex]?.focus(), 10);
        requestAnimationFrame(() => {
          inputRefs.current[charIndex]?.focus();
        });
      } else if (charIndex > 0) {
        const mesafe = inputRefs.current
          .slice(0, charIndex)
          .reverse()
          .findIndex((input) => input && !input.disabled);
        if (mesafe !== -1) {
          const hedefIndex = charIndex - 1 - mesafe;
          yeniHarfler[hedefIndex] = "";
          //setTimeout(() => inputRefs.current[hedefIndex]?.focus(), 10);
          requestAnimationFrame(() => {
            inputRefs.current[hedefIndex]?.focus();
          });
        }
      }
    } else if (key === "ENTER") {
      //BOŞ GEÇ
    } else {
      if (!inputRefs.current[charIndex]?.disabled) {
        yeniHarfler[charIndex] = key;

        const sonrakiMesafe = inputRefs.current
          .slice(charIndex + 1)
          .findIndex((input) => input && !input.disabled);

        if (sonrakiMesafe !== -1) {
          const hedefIndex = charIndex + 1 + sonrakiMesafe;
          setTimeout(() => inputRefs.current[hedefIndex]?.focus(), 10); //veya setCharIndex(hedefIndex)
        }
        if (!yeniHarfler.includes("")) {
          setTimeout(() => {
            kontrolEt(yeniHarfler, jokerIndexes); //sanal klavyede oto kontrol
          }, 0);
        }
      }
    }
    setHarfler(yeniHarfler);
  };

  // wordInput.tsx helper
  const updateHarf = (index: number, value: string) => {
    const yeniHarfler = [...harfler];
    yeniHarfler[index] = value;
    setHarfler(yeniHarfler);
    if (!yeniHarfler.includes("")) {
      //fiziksel klavyede oto kontrol
      setTimeout(() => {
        kontrolEt(yeniHarfler, jokerIndexes);
      }, 0);
    }
  };

  const deleteHarf = (targetIndex: number) => {
    const yeniHarfler = [...harfler];
    yeniHarfler[targetIndex] = "";
    setHarfler(yeniHarfler);
  };

  return {
    state: {
      ...state,
      data,
      harfler,
      totalPoints,
      aktifKelime,
      theme,
      charIndex,
      zaman,
      extraTimer,
    },
    actions: {
      StartTheGame,
      kontrolEt,
      harfVer,
      gaveUp,
      handleVirtualKey,
      setTheme,
      setCharIndex,
      updateHarf,
      deleteHarf,
      QuitTheGame,
      PauseTheGame,
      BackToMenu,
    },
    refs: { inputRefs },
  };
};
