import type { TimerModeProps } from "../types/propTypes";
import type { Kelime } from "../types/wordTypes";
import type { SoruOzeti } from "../types/kayitType";

type Cevap = "dogru" | "yanlis" | "pas" | "tekrar";

type GameState = {
  currentIndex: number;
  sonuc: string;
  gameEnd: boolean;
  gameList: Kelime[];
  startGame: boolean;
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
  autoNext: boolean;
};

export const initialState: GameState = {
  currentIndex: 0,
  sonuc: "",
  gameEnd: false,
  gameList: [],
  startGame: false,
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
  autoNext: false,
};

type Action =
  | { type: "START_GAME"; payload: Kelime[] }
  | { type: "QUIT_GAME" }
  | { type: "BACK_MENU" }
  | { type: "CEVAP"; payload: Cevap }
  | { type: "SET_HARFLER"; payload: string[] }
  | {
      type: "NEXT_QUESTION";
      yeniKayit: SoruOzeti;
    }
  | { type: "SET_SONUC"; payload: string }
  | { type: "SET_TIMER_MODE"; payload: "main" | "extra" | "pause" }
  | { type: "HARF_VER"; payload: { index: number } };

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
        ozetListesi: [],
        jokerIndexes: [],
      };
    case "BACK_MENU":
      return {
        ...initialState,
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
        ozetListesi: [...state.ozetListesi, action.yeniKayit],
        currentIndex: isLastQuestion
          ? state.currentIndex
          : state.currentIndex + 1,
        gameEnd: isLastQuestion,
        timerMode: isLastQuestion ? "pause" : "main",
        takenWordsPQ: 0,
        sonuc: "",
        jokerIndexes: [],
        autoNext: false,
      };
    }
    case "CEVAP": { //4 farklı cevap için 4 farklı mesaj ve skor güncellemesi
      const durum = action.payload;
      const nextState = {
        ...state,
        cevap: durum,
        timerMode: durum === "tekrar" ? state.timerMode : ("pause" as const),
      }
      if (durum === "dogru") {
        return {
          ...nextState,
          sonuc: "Doğru!",
          score: { ...state.score, correct: state.score.correct + 1 },
        };
      }
      if (durum === "yanlis") {
        return {
          ...nextState,
          sonuc: "Süre doldu, yanlış!",
          score: { ...state.score, wrong: state.score.wrong + 1 },
          autoNext: true,
        };
      }
      if (durum === "pas") {
        return {
          ...nextState,
          score: { ...state.score, pass: state.score.pass - 1 },
        };
      }
      if (durum === "tekrar") {
        return {
          ...nextState,
          sonuc: "Bir daha dene!",
        };
      }
      return state
    }
    case "HARF_VER": {
      return {
        ...state,
        takenWordsPQ: state.takenWordsPQ + 1,
        score: {
          ...state.score,
          takenWords: state.score.takenWords + 1,
        },
        jokerIndexes: [...(state.jokerIndexes || []), action.payload.index],
        //sonuc: `${action.payload.harf} harfi alındı`,
      };
    }
    case "SET_TIMER_MODE":
      return {
        ...state,
        timerMode: action.payload,
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
