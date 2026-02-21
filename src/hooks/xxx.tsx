//import type { TimerModeProps } from "../types/propTypes";
import { useEffect, useState, useRef, useCallback, useReducer } from "react";
import { getTheme } from "../utils/getTheme";
import type { KeyboardTheme } from "../virtualKeyboard/KeyboardPalettes";
import type { SoruOzeti } from "../types/kayitType";
import { gameReducer, initialState } from "./gameReducer";

export const useGameLogic = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const {
    harfler,
    currentIndex,
    sonuc,
    gameEnd,
    gameList,
    startGame,
    timerMode,
    score,
    takenWordsPQ,
    jokerIndexes,
  } = state;

  const [data, setData] = useState<KelimeData | null>(null);
  const keyboardProgress = useRef(false);
  const [theme, setTheme] = useState<KeyboardTheme>(() => getTheme());
  const [charIndex, setCharIndex] = useState<number>(0); // sanal klavye için //v-keyboard

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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
      const harfBosalt = Array(aktifKelime.kelime.length).fill("");
      dispatch({ type: "SET_SONUC", payload: "" });
      dispatch({ type: "SET_HARFLER", payload: harfBosalt });
      // Input focus için ufak bir timeout (render beklemek için)
      setTimeout(() => inputRefs.current[0]?.focus(), 50);
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
      //setOzetListesi((prev) => [...prev, yeniKayit]);

      dispatch({ type: "NEXT_QUESTION", yeniKayit });
    },
    [aktifKelime, takenWordsPQ, currentIndex],
  );

  const kontrolEt = useCallback(() => {
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
      // 1 saniye bekleyip sonraki soruya geç
      dispatch({ type: "DOGRU_CEVAP" });
      setTimeout(() => {
        NextQuestion("dogru");
        keyboardProgress.current = false;
      }, 400);
    } else {
      dispatch({ type: "YANLIS_CEVAP" });
      const noJoker = harfler.map((harf, index) =>
        jokerIndexes?.includes(index) ? harf : "",
      );
      const emptyWord = noJoker.findIndex((h) => h === "");

      setTimeout(() => {
        dispatch({ type: "SET_SONUC", payload: "" });
        dispatch({ type: "SET_HARFLER", payload: noJoker });
        keyboardProgress.current = false;
        if (emptyWord !== -1) {
          inputRefs.current[emptyWord]?.focus();
        }
      }, 800);
    }
  }, [harfler, NextQuestion, aktifKelime, sonuc, jokerIndexes]);

  useEffect(() => {
    // 1. Eğer harfler henüz dolmadıysa bakma
    if (!harfler || harfler.length === 0 || harfler.includes("")) return;

    // 2. Eğer zaten "Doğru!" dediysek veya işlem sürüyorsa dur
    if (sonuc === "Doğru!" || keyboardProgress.current) return;

    // 3. Her şey okeyse kontrol et
    kontrolEt();
  }, [harfler, kontrolEt, sonuc]);

  useEffect(() => {
    if (timerMode === "pause" || !startGame || gameEnd) return;
    const interval = window.setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameEnd, startGame, timerMode]);

  useEffect(() => {
    if (timerMode === "pause" && sonuc === "Süre doldu,yanlış!") {
      const timeout = setTimeout(() => {
        NextQuestion("yanlis");
        dispatch({ type: "SET_SONUC", payload: "" });
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [timerMode, sonuc, NextQuestion]);

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
    dispatch({ type: "START_GAME", payload: pool });
    dispatch({ type: "SET_SONUC", payload: "" });
  };

  const harfVer = () => {
    if (!aktifKelime || timerMode === "extra") {
      if (timerMode === "extra") {
        dispatch({
          type: "SET_SONUC",
          payload: "Zaman durduğubnda harf alamazsınız!",
        });
        setTimeout(() => {
          dispatch({ type: "SET_SONUC", payload: "" });
        }, 1000);
      }
      return;
    }
    const bosIndex = harfler
      .map((h, index) => (h === "" ? index : null)) //boş olup olmayan yerleri kontrol ettik
      .filter((index) => index !== null) as number[]; //boş ise sayı dizisine attık

    if (bosIndex.length > 0) {
      const randomSecim = bosIndex[Math.floor(Math.random() * bosIndex.length)];
      //const yeniHarfler = [...harfler]; //harflerin kopyası oluşturuldu
      const alinanHarf =
        aktifKelime.kelime[randomSecim].toLocaleUpperCase("tr-TR");
      dispatch({
        type: "HARF_VER",
        payload: { harf: alinanHarf, index: randomSecim },
      });
      /* if (inputRefs.current[randomSecim]) {
        inputRefs.current[randomSecim].disabled = true;
      } */
      //const focusOnEmpty = harfler.findIndex((h) => h === ""); //boş ve müsait olan ilk yere focus atmak
      //inputRefs.current[focusOnEmpty]?.focus(); //en baştaki boş inputa focus at
      //setTimeout(() => dispatch({ type: "SET_SONUC", payload: "" }), 1000);
      const focusOnEmpty = harfler.findIndex(
        (h, i) => h === "" && i !== randomSecim, //boş ve müsait olan ilk yere focus at
      );
      if (focusOnEmpty !== -1) {
        setTimeout(() => inputRefs.current[focusOnEmpty]?.focus(), 10); //en baştaki boş inputa focus at
      }
    }
  };

  const gaveUp = () => {
    if (timerMode === "extra") {
      dispatch({
        type: "SET_SONUC",
        payload: "Zaman durduğunda PAS YAPAMAZSIN",
      });
      setTimeout(() => dispatch({ type: "SET_SONUC", payload: "" }), 1000);
      return;
    }
    if (score.pass > 0) {
      dispatch({ type: "PAS_CEVAP" });
      setTimeout(() => {
        NextQuestion("pas");
      }, 400);
    } else {
      dispatch({ type: "SET_SONUC", payload: "Pas hakkın kalmadı!" });
      setTimeout(() => dispatch({ type: "SET_SONUC", payload: "" }), 1000);
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
    } else if (key === "ENTER") {
      //BOŞ GEÇ
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

    dispatch({ type: "SET_HARFLER", payload: yeniHarfler });
  };

  // wordInput.tsx helper

  const updateHarf = (index: number, value: string) => {
    const yeniHarfler = [...harfler];
    yeniHarfler[index] = value.toLocaleUpperCase("tr-TR");
    dispatch({ type: "SET_HARFLER", payload: yeniHarfler });
  };

  const deleteHarf = (targetIndex: number) => {
    const yeniHarfler = [...harfler];
    yeniHarfler[targetIndex] = "";
    dispatch({ type: "SET_HARFLER", payload: yeniHarfler });
  };

  return {
    state: {
      ...state,
      data,
      totalPoints,
      aktifKelime,
      theme,
      charIndex,
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

import type { SoruOzeti } from "../types/kayitType";
import type { TimerModeProps } from "../types/propTypes";
import type { Kelime } from "../types/wordTypes";

type GameState = {
  harfler: string[];
  currentIndex: number;
  sonuc: string;
  gameEnd: boolean;
  gameList: Kelime[];
  startGame: boolean;
  zaman: number;
  extraTimer: number;
  timerMode: TimerModeProps;
  takenWordsPQ: number;
  score: {
    correct: number;
    wrong: number;
    takenWords: number;
    pass: number;
  };
  ozetListesi: SoruOzeti[];
  jokerIndexes: number[];
};

export const initialState: GameState = {
  harfler: [],
  currentIndex: 0,
  sonuc: "",
  gameEnd: false,
  gameList: [],
  startGame: false,
  zaman: 210,
  extraTimer: 15,
  timerMode: "pause",
  takenWordsPQ: 0,
  score: {
    correct: 0,
    wrong: 0,
    takenWords: 0,
    pass: 5,
  },
  ozetListesi: [],
  jokerIndexes: [],
};

type Action =
  | { type: "START_GAME"; payload: Kelime[] }
  | { type: "QUIT_GAME" }
  | { type: "BACK_MENU" }
  | { type: "DOGRU_CEVAP" }
  | { type: "YANLIS_CEVAP" }
  | { type: "PAS_CEVAP" }
  | { type: "SET_HARFLER"; payload: string[] }
  | {
      type: "NEXT_QUESTION";
      yeniKayit: SoruOzeti;
    }
  | { type: "SET_SONUC"; payload: string }
  | { type: "TICK" } // Zamanın akışı için
  | { type: "SET_TIMER_MODE"; payload: "main" | "extra" | "pause" }
  | { type: "HARF_VER"; payload: { harf: string; index: number } };

export function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "START_GAME":
      return {
        ...initialState,
        gameList: action.payload,
        currentIndex: 0,
        startGame: true,
        gameEnd: false,
        timerMode: "main",
        zaman: 210,
        extraTimer: 15,
        ozetListesi: [],
        jokerIndexes: [],
      };
    case "BACK_MENU":
      return{
        ...initialState
      }
    case "SET_HARFLER":
      return {
        ...state,
        harfler: action.payload,
      };
    case "SET_SONUC":
      return {
        ...state,
        sonuc: action.payload,
      };
    case "NEXT_QUESTION": {
      const isLastQuestion = state.currentIndex >= state.gameList.length - 1;
      return {
        ...state,
        harfler: [],
        ozetListesi: [...state.ozetListesi, action.yeniKayit],
        currentIndex: isLastQuestion
          ? state.currentIndex
          : state.currentIndex + 1,
        gameEnd: isLastQuestion,
        extraTimer: 15,
        timerMode: isLastQuestion ? "pause" : "main",
        takenWordsPQ: 0,
        sonuc: "",
        jokerIndexes: [],
      };
    }
    case "HARF_VER": {
      const yeniHarfler = [...state.harfler];
      yeniHarfler[action.payload.index] = action.payload.harf;
      return {
        ...state,
        harfler: yeniHarfler,
        takenWordsPQ: state.takenWordsPQ + 1,
        score: {
          ...state.score,
          takenWords: state.score.takenWords + 1,
        },
        jokerIndexes : [...(state.jokerIndexes || []), action.payload.index],
        sonuc: `${action.payload.harf} harfi alındı`,
      };
    }
    case "TICK": {
      if (state.gameEnd || state.timerMode === "pause") return state;
      if (state.timerMode === "main") {
        if (state.zaman <= 1) {
          return { ...state, zaman: 0, timerMode: "pause", gameEnd: true };
        }
        return { ...state, zaman: state.zaman - 1 };
      }
      if (state.timerMode === "extra") {
        if (state.extraTimer <= 0) {
          return {
            ...state,
            extraTimer: 0,
            timerMode: "pause",
            sonuc: "Süre doldu,yanlış!",
            score: {
              ...state.score,
              wrong: state.score.wrong + 1,
            },
          };
        }
        return { ...state, extraTimer: state.extraTimer - 1 };
      }
      return state;
    }
    case "SET_TIMER_MODE":
      return {
        ...state,
        timerMode: action.payload,
      };
    case "DOGRU_CEVAP":
      return {
        ...state,
        sonuc: "Doğru!",
        timerMode: "pause",
        score: { ...state.score, correct: state.score.correct + 1 },
      };
    case "YANLIS_CEVAP":
      return {
        ...state,
        sonuc: "Bir daha dene!",
      };
    case "PAS_CEVAP":
      return {
        ...state,
        score: { ...state.score, pass: state.score.pass - 1 },
      };
    case "QUIT_GAME":
      return {
        ...state,
        gameEnd: true,
      };
    default:
      return state;
  }
}


//setsonucu cıakrıcam bu kalsın
//import type { TimerModeProps } from "../types/propTypes";
import type { KelimeData } from "../types/wordTypes";
import { useEffect, useState, useRef, useCallback, useReducer } from "react";
import { getTheme } from "../utils/getTheme";
import type { KeyboardTheme } from "../virtualKeyboard/KeyboardPalettes";
import type { SoruOzeti } from "../types/kayitType";
import { gameReducer, initialState } from "./gameReducer";

export const useGameLogic = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const {
    harfler,
    currentIndex,
    sonuc,
    gameEnd,
    gameList,
    startGame,
    timerMode,
    score,
    takenWordsPQ,
    jokerIndexes,
  } = state;

  const [data, setData] = useState<KelimeData | null>(null);
  const keyboardProgress = useRef(false);
  const [theme, setTheme] = useState<KeyboardTheme>(() => getTheme());
  const [charIndex, setCharIndex] = useState<number>(0); // sanal klavye için //v-keyboard

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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
      const harfBosalt = Array(aktifKelime.kelime.length).fill("");
      dispatch({ type: "SET_SONUC", payload: "" });
      dispatch({ type: "SET_HARFLER", payload: harfBosalt });
      // Input focus için ufak bir timeout (render beklemek için)
      //setTimeout(() => inputRefs.current[0]?.focus(), 10);
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

      dispatch({ type: "NEXT_QUESTION", yeniKayit });
    },
    [aktifKelime, takenWordsPQ, currentIndex],
  );

  const kontrolEt = useCallback(() => {
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
      // 1 saniye bekleyip sonraki soruya geç
      dispatch({ type: "DOGRU_CEVAP" });
      setTimeout(() => {
        NextQuestion("dogru");
        keyboardProgress.current = false;
      }, 400);
    } else {
      dispatch({ type: "YANLIS_CEVAP" });
      const noJoker = harfler.map((harf, index) =>
        jokerIndexes?.includes(index) ? harf : "",
      );
      const emptyWord = noJoker.findIndex((h) => h === "");

      setTimeout(() => {
        dispatch({ type: "SET_SONUC", payload: "" }); //metni temizlemek için
        dispatch({ type: "SET_HARFLER", payload: noJoker });
        keyboardProgress.current = false;
        if (emptyWord !== -1) {
          //inputRefs.current[emptyWord]?.focus();
          requestAnimationFrame(() => {
            inputRefs.current[emptyWord]?.focus();
          });
        }
      }, 800);
    }
  }, [harfler, NextQuestion, aktifKelime, sonuc, jokerIndexes]);

  useEffect(() => {
    // 1. Eğer harfler henüz dolmadıysa bakma
    if (!harfler || harfler.length === 0 || harfler.includes("")) return;

    // 2. Eğer zaten "Doğru!" dediysek veya işlem sürüyorsa dur
    if (sonuc === "Doğru!" || keyboardProgress.current) return;

    // 3. Her şey okeyse kontrol et
    kontrolEt();
  }, [harfler, kontrolEt, sonuc]);

  useEffect(() => {
    if (timerMode === "pause" || !startGame || gameEnd) return;
    const interval = window.setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameEnd, startGame, timerMode]);

  useEffect(() => {
    if (timerMode === "pause" && sonuc === "Süre doldu,yanlış!") {
      const timeout = setTimeout(() => {
        NextQuestion("yanlis");
        dispatch({ type: "SET_SONUC", payload: "" });
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [timerMode, sonuc, NextQuestion]);

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
    dispatch({ type: "START_GAME", payload: pool });
    dispatch({ type: "SET_SONUC", payload: "" });
  };

  const harfVer = () => {
    if (!aktifKelime || timerMode === "extra") {
      if (timerMode === "extra") {
        dispatch({
          type: "SET_SONUC",
          payload: "Zaman durduğubnda harf alamazsınız!",
        });
        setTimeout(() => {
          dispatch({ type: "SET_SONUC", payload: "" });
        }, 1000);
      }
      return;
    }
    const bosIndex = harfler
      .map((h, index) => (h === "" ? index : null)) //boş olup olmayan yerleri kontrol ettik
      .filter((index) => index !== null) as number[]; //boş ise sayı dizisine attık

    if (bosIndex.length > 0) {
      const randomSecim = bosIndex[Math.floor(Math.random() * bosIndex.length)];
      //const yeniHarfler = [...harfler]; //harflerin kopyası oluşturuldu
      const alinanHarf =
        aktifKelime.kelime[randomSecim].toLocaleUpperCase("tr-TR");
      dispatch({
        type: "HARF_VER",
        payload: { harf: alinanHarf, index: randomSecim },
      });
      const focusOnEmpty = harfler.findIndex(
        (h, i) => h === "" && i !== randomSecim, //boş ve müsait olan ilk yere focus at
      );
      if (focusOnEmpty !== -1) {
        requestAnimationFrame(() => {
          inputRefs.current[focusOnEmpty]?.focus();
        });
        //setTimeout(() => inputRefs.current[focusOnEmpty]?.focus(), 10); //en baştaki boş inputa focus at
      }
    }
  };

  const gaveUp = () => {
    if (timerMode === "extra") {
      dispatch({
        type: "SET_SONUC",
        payload: "Zaman durduğunda PAS YAPAMAZSIN",
      });
      setTimeout(() => dispatch({ type: "SET_SONUC", payload: "" }), 1000);
      return;
    }
    if (score.pass > 0) {
      dispatch({ type: "PAS_CEVAP" });
      setTimeout(() => {
        NextQuestion("pas");
      }, 400);
    } else {
      dispatch({ type: "SET_SONUC", payload: "Pas hakkın kalmadı!" });
      setTimeout(() => dispatch({ type: "SET_SONUC", payload: "" }), 1000);
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

    dispatch({ type: "SET_HARFLER", payload: yeniHarfler });
  };

  // wordInput.tsx helper

  const updateHarf = (index: number, value: string) => {
    const yeniHarfler = [...harfler];
    yeniHarfler[index] = value.toLocaleUpperCase("tr-TR");
    dispatch({ type: "SET_HARFLER", payload: yeniHarfler });
  };

  const deleteHarf = (targetIndex: number) => {
    const yeniHarfler = [...harfler];
    yeniHarfler[targetIndex] = "";
    dispatch({ type: "SET_HARFLER", payload: yeniHarfler });
  };

  return {
    state: {
      ...state,
      data,
      totalPoints,
      aktifKelime,
      theme,
      charIndex,
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

OLMADI HER YER HATA BAGIRIYOR BAK VE Bİ DAHA UYGUN SEKİLDE YAZ nolur import type { SoruOzeti } from "../types/kayitType";
import type { TimerModeProps } from "../types/propTypes";
import type { Kelime } from "../types/wordTypes";

type GameState = {
  harfler: string[];
  currentIndex: number;
  sonuc: string;
  gameEnd: boolean;
  gameList: Kelime[];
  startGame: boolean;
  zaman: number;
  extraTimer: number;
  timerMode: TimerModeProps;
  takenWordsPQ: number;
  score: {
    correct: number;
    wrong: number;
    takenWords: number;
    pass: number;
  };
  ozetListesi: SoruOzeti[];
  jokerIndexes: number[];
};

export const initialState: GameState = {
  harfler: [],
  currentIndex: 0,
  sonuc: "",
  gameEnd: false,
  gameList: [],
  startGame: false,
  zaman: 210,
  extraTimer: 15,
  timerMode: "pause",
  takenWordsPQ: 0,
  score: {
    correct: 0,
    wrong: 0,
    takenWords: 0,
    pass: 5,
  },
  ozetListesi: [],
  jokerIndexes: [],
};

type Action =
  | { type: "START_GAME"; payload: Kelime[] }
  | { type: "QUIT_GAME" }
  | { type: "BACK_MENU" }
  | { type: "DOGRU_CEVAP" }
  | { type: "YANLIS_CEVAP" }
  | { type: "PAS_CEVAP" }
  | { type: "SET_HARFLER"; payload: string[] }
  | {
      type: "NEXT_QUESTION";
      yeniKayit: SoruOzeti;
    }
  | { type: "SET_SONUC"; payload: string }
  | { type: "TICK" } // Zamanın akışı için
  | { type: "SET_TIMER_MODE"; payload: "main" | "extra" | "pause" }
  | { type: "HARF_VER"; payload: { harf: string; index: number } };

export function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "START_GAME":
      return {
        ...initialState,
        gameList: action.payload,
        currentIndex: 0,
        startGame: true,
        gameEnd: false,
        timerMode: "main",
        zaman: 210,
        extraTimer: 15,
        ozetListesi: [],
        jokerIndexes: [],
      };
    case "BACK_MENU":
      return{
        ...initialState
      }
    case "SET_HARFLER":
      return {
        ...state,
        harfler: action.payload,
      };
    case "SET_SONUC":
      return {
        ...state,
        sonuc: action.payload,
      };
    case "NEXT_QUESTION": {
      const isLastQuestion = state.currentIndex >= state.gameList.length - 1;
      return {
        ...state,
        harfler: [],
        ozetListesi: [...state.ozetListesi, action.yeniKayit],
        currentIndex: isLastQuestion
          ? state.currentIndex
          : state.currentIndex + 1,
        gameEnd: isLastQuestion,
        extraTimer: 15,
        timerMode: isLastQuestion ? "pause" : "main",
        takenWordsPQ: 0,
        sonuc: "",
        jokerIndexes: [],
      };
    }
    case "HARF_VER": {
      const yeniHarfler = [...state.harfler];
      yeniHarfler[action.payload.index] = action.payload.harf;
      return {
        ...state,
        harfler: yeniHarfler,
        takenWordsPQ: state.takenWordsPQ + 1,
        score: {
          ...state.score,
          takenWords: state.score.takenWords + 1,
        },
        jokerIndexes : [...(state.jokerIndexes || []), action.payload.index],
        //sonuc: `${action.payload.harf} harfi alındı`,
      };
    }
    case "TICK": {
      if (state.gameEnd || state.timerMode === "pause") return state;
      if (state.timerMode === "main") {
        if (state.zaman <= 1) {
          return { ...state, zaman: 0, timerMode: "pause", gameEnd: true };
        }
        return { ...state, zaman: state.zaman - 1 };
      }
      if (state.timerMode === "extra") {
        if (state.extraTimer <= 0) {
          return {
            ...state,
            extraTimer: 0,
            timerMode: "pause",
            sonuc: "Süre doldu,yanlış!",
            score: {
              ...state.score,
              wrong: state.score.wrong + 1,
            },
          };
        }
        return { ...state, extraTimer: state.extraTimer - 1 };
      }
      return state;
    }
    case "SET_TIMER_MODE":
      return {
        ...state,
        timerMode: action.payload,
      };
    case "DOGRU_CEVAP":
      return {
        ...state,
        sonuc: "Doğru!",
        timerMode: "pause",
        score: { ...state.score, correct: state.score.correct + 1 },
      };
    case "YANLIS_CEVAP":
      return {
        ...state,
        //sonuc: "Bir daha dene!",
      };
    case "PAS_CEVAP":
      return {
        ...state,
        score: { ...state.score, pass: state.score.pass - 1 },
      };
    case "QUIT_GAME":
      return {
        ...state,
        gameEnd: true,
      };
    default:
      return state;
  }
}  //import type { TimerModeProps } from "../types/propTypes";
import type { KelimeData } from "../types/wordTypes";
import { useEffect, useState, useRef, useCallback, useReducer } from "react";
import { getTheme } from "../utils/getTheme";
import type { KeyboardTheme } from "../virtualKeyboard/KeyboardPalettes";
import type { SoruOzeti } from "../types/kayitType";
import { gameReducer, initialState } from "./gameReducer";

export const useGameLogic = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const {
    harfler,
    currentIndex,
    sonuc,
    gameEnd,
    gameList,
    startGame,
    timerMode,
    score,
    takenWordsPQ,
    jokerIndexes,
  } = state;

  const [data, setData] = useState<KelimeData | null>(null);
  
  const keyboardProgress = useRef(false);
  const [theme, setTheme] = useState<KeyboardTheme>(() => getTheme());
  const [charIndex, setCharIndex] = useState<number>(0); // sanal klavye için //v-keyboard

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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
      const harfBosalt = Array(aktifKelime.kelime.length).fill("");
      //dispatch({ type: "SET_SONUC", payload: "" });
      dispatch({ type: "SET_HARFLER", payload: harfBosalt });
      // Input focus için ufak bir timeout (render beklemek için)
      //setTimeout(() => inputRefs.current[0]?.focus(), 10);
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

      dispatch({ type: "NEXT_QUESTION", yeniKayit });
    },
    [aktifKelime, takenWordsPQ, currentIndex],
  );

  const kontrolEt = useCallback(() => {
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
      //  bekleyip sonraki soruya geç
      dispatch({ type: "DOGRU_CEVAP" });
      setTimeout(() => {
        NextQuestion("dogru");
        keyboardProgress.current = false;
      }, 400);
    } else {
      dispatch({ type: "YANLIS_CEVAP" });
      const noJoker = harfler.map((harf, index) =>
        jokerIndexes?.includes(index) ? harf : "",
      );
      const emptyWord = noJoker.findIndex((h) => h === "");

      setTimeout(() => {
        //dispatch({ type: "SET_SONUC", payload: "" }); //metni temizlemek için
        dispatch({ type: "SET_HARFLER", payload: noJoker });
        keyboardProgress.current = false;
        if (emptyWord !== -1) {
          //inputRefs.current[emptyWord]?.focus();
          requestAnimationFrame(() => {
            inputRefs.current[emptyWord]?.focus();
          });
        }
      }, 800);
    }
  }, [harfler, NextQuestion, aktifKelime, sonuc, jokerIndexes]);

  useEffect(() => {
    // 1. Eğer harfler henüz dolmadıysa bakma
    if (!harfler || harfler.length === 0 || harfler.includes("")) return;

    // 2. Eğer zaten "Doğru!" dediysek veya işlem sürüyorsa dur
    if (sonuc === "Doğru!" || keyboardProgress.current) return;

    // 3. Her şey okeyse kontrol et
    kontrolEt();
  }, [harfler, kontrolEt, sonuc]);

  useEffect(() => {
    if (timerMode === "pause" || !startGame || gameEnd) return;
    const interval = window.setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameEnd, startGame, timerMode]);

  useEffect(() => {
    if (timerMode === "pause" && sonuc === "Süre doldu,yanlış!") {
      const timeout = setTimeout(() => {
        NextQuestion("yanlis");
        //dispatch({ type: "SET_SONUC", payload: "" });
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [timerMode, sonuc, NextQuestion]);

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
    dispatch({ type: "START_GAME", payload: pool });
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
      //const yeniHarfler = [...harfler]; //harflerin kopyası oluşturuldu
      const alinanHarf =
        aktifKelime.kelime[randomSecim].toLocaleUpperCase("tr-TR");
      dispatch({
        type: "HARF_VER",
        payload: { harf: alinanHarf, index: randomSecim },
      });
      const focusOnEmpty = harfler.findIndex(
        (h, i) => h === "" && i !== randomSecim, //boş ve müsait olan ilk yere focus at
      );
      if (focusOnEmpty !== -1) {
        requestAnimationFrame(() => {
          inputRefs.current[focusOnEmpty]?.focus();
        });
        //setTimeout(() => inputRefs.current[focusOnEmpty]?.focus(), 10); //en baştaki boş inputa focus at
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
      dispatch({ type: "PAS_CEVAP" });
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

    dispatch({ type: "SET_HARFLER", payload: yeniHarfler });
  };

  // wordInput.tsx helper

  const updateHarf = (index: number, value: string) => {
    const yeniHarfler = [...harfler];
    yeniHarfler[index] = value.toLocaleUpperCase("tr-TR");
    dispatch({ type: "SET_HARFLER", payload: yeniHarfler });
  };

  const deleteHarf = (targetIndex: number) => {
    const yeniHarfler = [...harfler];
    yeniHarfler[targetIndex] = "";
    dispatch({ type: "SET_HARFLER", payload: yeniHarfler });
  };

  return {
    state: {
      ...state,
      data,
      totalPoints,
      aktifKelime,
      theme,
      charIndex,
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
