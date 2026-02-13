//WordInput.tsx
export interface InputProps {
  harfler: string[];
  setHarfler: React.Dispatch<React.SetStateAction<string[]>>;
  inputRefs: React.RefObject<(HTMLInputElement | null)[]>;
  onEnter: () => void;
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
  children: React.ReactNode;
  parent: string;
  colors: string;
  className?: string;
}

