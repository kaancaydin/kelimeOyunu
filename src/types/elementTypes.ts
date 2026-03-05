export type ButtonProps = {
  children?: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant: "check" | "checkSmall" | "pass" | "close" | "clue" | "restart";
  disabled?: boolean;
  ternaryOp?: React.ReactNode;
};

export type StartButtonProps = {
  //children: React.ReactNode;
  mode: string;
  onClick: () => void;
  //className?: string;
  rgbColor: string;
  borderColor: string;
};

export interface LiquidGlassProps<T extends React.ElementType> {
  //t'nin olabileceği her türlü html elemetine olanak verdik
  as?: T; // Hangi etiket olacağını belirler
  children?: React.ReactNode;
  className?: string;
}

export interface CluesProps {
  parent?: string;
  children: React.ReactNode;
  color: string;
  className?: string;
}
