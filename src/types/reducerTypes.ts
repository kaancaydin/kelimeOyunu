import type { TimerModeProps } from "../types/propTypes";
import type { Kelime } from "../types/wordTypes";
import type { SoruOzeti } from "../types/kayitType";


export type Cevap = "dogru" | "yanlis" | "pas" | "tekrar";
export type GameMode = "classic" | "fillgap";

export type GameState = {
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
  gameMode: GameMode | null;
};