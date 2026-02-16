import type { InputProps } from "../types/propTypes";

export const WordInput = ({
  harfler,
  setHarfler,
  inputRefs,
  onEnter,
  density = "normal",
  setCharIndex
}: InputProps) => {
  const sizeClasses = {
    normal: "w-10 h-10 sm:w-16 sm:h-16",
    medium: "w-9 h-9 sm:w-16 sm:h-16",
    compact: "w-7 h-7 sm:w-16 sm:h-16",
  };

  const gapClasses = {
    normal: "gap-0.75",
    medium: "gap-0.5",
    compact: "gap-0.10",
  };
  return (
    <div className={`flex  ${gapClasses[density]} justify-center `}>
      {harfler.map((harf, index) => (
        <input
          className={`
          ${sizeClasses[density]}
          font-bold border-2 text-[clamp(1.2rem,3vw,1.6rem)]
          caret-transparent border-[#ddd] outline-0
          rounded-full shadow-md text-center uppercase shrink-0
          transition-all duration-150 leading-none tabular-nums
          focus:border-indigo-600 focus:scale-105 focus:shadow-lg
          focus:shadow-indigo-300/50
        `}
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          onFocus={() => setCharIndex(index)}
          type="text"
          maxLength={1}
          inputMode="none"
          autoComplete="off"
          spellCheck={false}
          value={harf}
          onChange={(e) => {
            const value = e.target.value.toLowerCase();
            setHarfler((prev) => {
              const yeni = [...prev];
              yeni[index] = value;
              return yeni;
            });

            if (value && inputRefs.current[index + 1]) {
              inputRefs.current[index + 1]?.focus();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace") {
              if (inputRefs.current[index]?.disabled) {
                e.preventDefault();
                return;
              }
              if (harfler[index] === "" && index > 0) {
                e.preventDefault();
                const mesafe = inputRefs.current
                  .slice(0, index)
                  .reverse()
                  .findIndex((input) => input && !input.disabled);
                if (mesafe !== -1) {
                  const hedefIndex = index - 1 - mesafe;
                  inputRefs.current[hedefIndex]?.focus();
                  setHarfler((prev) => {
                    const yeni = [...prev];
                    yeni[hedefIndex] = "";
                    return yeni;
                  });
                }
              }
            }
            if (e.key === "ArrowLeft" && index > 0) {
              e.preventDefault();
              const mesafe = inputRefs.current
                .slice(0, index)
                .reverse()
                .findIndex((input) => input && !input.disabled);
              if (mesafe !== -1) {
                const hedefIndex = index - 1 - mesafe;
                inputRefs.current[hedefIndex]?.focus();
              }
            }
            if (e.key === "ArrowRight" && index < harfler.length - 1) {
              e.preventDefault();
              const mesafe = inputRefs.current
                .slice(index + 1)
                .findIndex((input) => input && !input.disabled);
              if (mesafe !== -1) {
                const hedefIndex = index + 1 + mesafe;
                inputRefs.current[hedefIndex]?.focus();
              }
            }
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();

              onEnter();
            }
          }}
        />
      ))}
    </div>
  );
};


/* 
if (harfler[index] !== "") {
  setHarfler((prev) => {
    const yeni = [...prev];
    yeni[index] = "";
    return yeni;
  });
} else if (index > 0) {
  inputRefs.current[index - 1]?.focus();
  setHarfler((prev) => {
    const yeni = [...prev];
    yeni[index - 1] = "";
    return yeni;
});
} */