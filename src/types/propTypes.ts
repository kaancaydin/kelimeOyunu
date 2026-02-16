//WordInput.tsx
export interface InputProps {
  harfler: string[];
  setHarfler: React.Dispatch<React.SetStateAction<string[]>>;
  inputRefs: React.RefObject<(HTMLInputElement | null)[]>;
  onEnter: () => void;
  density: "normal" | "medium" | "compact";
  setCharIndex: React.Dispatch<React.SetStateAction<number>>;
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
}

export interface ScoreStatsProps {
  children: number;
  parent: React.ReactNode;
  colors: string;
  className?: string;
  animate?: string;
}
