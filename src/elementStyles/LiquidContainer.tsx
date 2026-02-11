import { twMerge } from 'tailwind-merge'
//eğer  ki çakışma olursa bunu engeller
import type { LiquidGlassProps } from '../types/elementTypes';


export const LiquidContainer = <T extends React.ElementType = "div">({
  as,
  children,
  className = "",
  ...props // Diğer tüm HTML özelliklerini (id, onClick vb.) toplar, spread operator
}: LiquidGlassProps<T> & React.ComponentPropsWithoutRef<T>) => {
  // Eğer 'as' gelmezse varsayılan olarak 'div' olsun
  const Component = as || "div";

  // Ortak Liquid Glass stilleri
  const baseStyles = `
    outline-1 -outline-offset-1 outline-white/30
    border border-white/20 isolate 
    overflow-hidden transition-all duration-300 ease-in-out 
    [background-blend-mode:plus-darker,overlay,saturation,normal]
    backdrop-blur-xl
    shadow-[inset_0px_1px_1px_rgba(255,255,255,0.5),inset_0px_-2px_8px_rgba(0,0,0,0.2),0px_10px_20px_rgba(0,0,0,0.3)]
    bg-[linear-gradient(0deg,#0091FF,#0091FF),linear-gradient(0deg,#999999,#999999),linear-gradient(0deg,#FFFFFF,#FFFFFF),rgba(255,255,255,0.5)]

  `;

  const hoverStyles = `
      hover:scale-110 hover:brightness-110
  `

  return (
    //<Component className={`${baseStyles} ${hoverStyles} ${className}`} {...props}>
    <Component className={twMerge(baseStyles, hoverStyles, className)} {...props}>
      {children}
    </Component>
  );
};

