import { memo, useCallback } from "react";
import type { InputProps } from "../types/propTypes";

interface WordCellProps { 
  index: number;
  harf: string;
  isJoker: boolean;
  density: string;
  sizeClasses: Record<string, string>;
  updateHarf: (idx: number, v: string) => void;
  deleteHarf: (idx: number) => void;
  setCharIndex: (idx: number) => void;
  registerRef: (el: HTMLInputElement | null, idx: number) => void;
  inputRefs: React.RefObject<(HTMLInputElement | null)[]>; // Read-only focus için
  findPrevEnabled: (idx: number) => number;
  findNextEnabled: (idx: number) => number;
  harfler: string[]; // Uzunluk için
}

const WordCell = memo(
  ({
    index,
    harf,
    isJoker,
    density,
    sizeClasses,
    updateHarf,
    deleteHarf,
    setCharIndex,
    registerRef,
    inputRefs,
    findPrevEnabled,
    findNextEnabled,
    harfler,
  }: WordCellProps) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.toLocaleUpperCase("tr-TR");
        updateHarf(index, val);

        // Harf girilince otomatik sonrakine odaklan (performans dostu yöntem)
        if (val) {
          const mesafe = findNextEnabled(index);
          if (mesafe !== -1) {
            requestAnimationFrame(() => inputRefs.current[index + 1 + mesafe]?.focus());
          }
        }
      },
      [index, updateHarf, findNextEnabled, inputRefs],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
          if (isJoker) {
            e.preventDefault();
            return;
          }
          if (harf === "" && index > 0) {
            e.preventDefault();
            const mesafe = findPrevEnabled(index);
            if (mesafe !== -1) {
              const hedefIndex = index - 1 - mesafe;
              deleteHarf(hedefIndex);
              requestAnimationFrame(() => inputRefs.current[hedefIndex]?.focus());
            }
          }
        }
        if (e.key === "ArrowLeft" && index > 0) {
          e.preventDefault();
          const mesafe = findPrevEnabled(index);
          if (mesafe !== -1) {
            const hedefIndex = index - 1 - mesafe;
            requestAnimationFrame(() => inputRefs.current[hedefIndex]?.focus());
          }
        }
        if (e.key === "ArrowRight" && index < harfler.length - 1) {
          e.preventDefault();
          const mesafe = findNextEnabled(index);
          if (mesafe !== -1) {
            const hedefIndex = index + 1 + mesafe;
            requestAnimationFrame(() => inputRefs.current[hedefIndex]?.focus());
          }
        }
      },
      [index, harf, isJoker, findPrevEnabled, findNextEnabled, deleteHarf, harfler.length, inputRefs],
    );

    return (
      <input
        ref={(el) => registerRef(el, index)} // Ref doldurma burada
        value={harf}
        disabled={isJoker}
        onFocus={() => setCharIndex(index)}
        maxLength={1}
        type="text"
        inputMode="none" // Mobil klavyeyi açmaz (sanal klavye için)
        spellCheck={false}
        autoComplete="off"
        className={`
          ${sizeClasses[density]}
          ${isJoker ? "bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300" : "bg-transparent"}
          font-bold border-2 text-[clamp(1.2rem,3vw,1.6rem)]
          caret-transparent border-[#ddd] outline-none text-white
          rounded-full shadow-md text-center uppercase shrink-0
          transition-all duration-150 leading-none select-none appearance-none
          focus:border-indigo-600 focus:scale-105
        `}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    );
  },
);

const assignRef = (
  refs: { current: (HTMLInputElement | null)[] | null }, 
  el: HTMLInputElement | null, 
  index: number
) => {
  if (refs && refs.current) {
    refs.current[index] = el;
  }
};
export const WordInput = ({
  harfler,
  updateHarf,
  deleteHarf,
  inputRefs,
  jokerIndexes,
  density = "normal",
  setCharIndex,
  aktifKelime,
}: InputProps) => {
  const sizeClasses = {
    normal: "w-10 h-10 sm:w-16 sm:h-16",
    medium: "w-9 h-9 sm:w-16 sm:h-16",
    compact: "w-7 h-7 sm:w-16 sm:h-16",
  };


const registerRef = useCallback(
    (el: HTMLInputElement | null, index: number) => {
      // 2. Propu doğrudan burada ellemiyoruz, dışarıdaki fonksiyona yolluyoruz.
      // React Compiler "prop modifikasyonu" analizini burada kaybeder.
      assignRef(inputRefs, el, index);
    },
    [inputRefs]
  );
  //müsait inputların mesafesini bulmaya yarıyor
  const findPrevEnabled = useCallback(
    (index: number) => {
      return inputRefs.current
        .slice(0, index)
        .reverse()
        .findIndex((input) => input && !input.disabled);
    },
    [inputRefs],
  );

  const findNextEnabled = useCallback(
    (index: number) => {
      return inputRefs.current
        .slice(index + 1)
        .findIndex((input) => input && !input.disabled);
    },
    [inputRefs],
  );

  return (
    <div
      className={`flex justify-center gap-0.5`}
      key={String(aktifKelime)}
    >
      {harfler.map((harf: string, index: number) => (
        <WordCell
          key={index}
          index={index}
          harf={harf}
          isJoker={jokerIndexes.includes(index)}
          density={density}
          sizeClasses={sizeClasses}
          updateHarf={updateHarf}
          deleteHarf={deleteHarf}
          setCharIndex={setCharIndex}
          registerRef={registerRef}
          inputRefs={inputRefs}
          findPrevEnabled={findPrevEnabled}
          findNextEnabled={findNextEnabled}
          harfler={harfler}
        />
      ))}
    </div>
  );
};