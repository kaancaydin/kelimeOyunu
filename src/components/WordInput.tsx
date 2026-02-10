interface Props {
  harfler: string[];
  setHarfler: React.Dispatch<React.SetStateAction<string[]>>;
  inputRefs: React.RefObject<(HTMLInputElement | null)[]>;
  onEnter: () => void
}

export const WordInput = ({harfler, setHarfler, inputRefs, onEnter}: Props) => {
  return(
    <div>
      {
    harfler.map((harf, index) => (
      <input
        className="font-bold border-2 text-[1.6rem] caret-transparent border-[#ddd] outline-0 w-[3.5em] h-[3.5em]
           rounded-full shadow-md text-center uppercase mb-4 transition-all duration-150 leading-none tabular-nums
           focus:border-indigo-600 focus:scale-105 focus:shadow-xl focus:shadow-indigo-300/50 
           "
        key={index}
        ref={(el) => {
          inputRefs.current[index] = el;
        }}
        type="text"
        maxLength={1}
        inputMode="text"
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
            }
          }
          if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
          }
          if (e.key === "ArrowRight" && index < harfler.length - 1) {
            inputRefs.current[index + 1]?.focus();
          }
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();

            onEnter()
          }
        }}
      />
    ))
  }
    </div>
  )
};
