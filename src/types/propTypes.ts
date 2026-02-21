import type { Kelime } from "./wordTypes";

//WordInput.tsx
export interface InputProps {
  harfler: string[];
  updateHarf: (index: number, value: string) => void;
  deleteHarf: (targetIndex: number) => void;
  inputRefs: React.RefObject<(HTMLInputElement | null)[]>;
  //onEnter: (guncelHarfler: string[], guncelJokerler: number[]) => void
  density: "normal" | "medium" | "compact";
  setCharIndex: React.Dispatch<React.SetStateAction<number>>;
  jokerIndexes: number[]
  aktifKelime: Kelime
}

//ScoreBoard.tsx
interface ScoreProps {
  correct: number;
  wrong: number;
  takenWords: number;
  pass: number;
}

export interface Props {
  score: ScoreProps;
  className?: string;
  sonuc? : string
}

export interface ScoreStatsProps {
  children: number;
  parent: React.ReactNode;
  colors: string;
  className?: string;
  animate?: string;
}

export type TimerModeProps = "main" | "extra" | "pause"