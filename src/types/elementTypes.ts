export interface ButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant: "check" | "checkSmall" | "pass" | "close" | "clue" | "restart";
  disabled?: boolean;
  ternaryOp?: React.ReactNode;
  tippyTitle?: string
  /*   extra?: React.ReactNode;
  extraClass?: React.ReactNode; */
  /*   icon?: React.ReactNode;
  iconClass?: string; */
}

export interface LiquidGlassProps<T extends React.ElementType> { //t'nin olabileceği her türlü html elemetine olanak verdik
  as?: T; // Hangi etiket olacağını belirler
  children?: React.ReactNode; 
  className?: string;
}

export interface CluesProps {
  parent?: string;
  children: React.ReactNode;
  color: string;
}