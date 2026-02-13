import { EnterIcon, DeleteIcon } from "../components/Icons";

const ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "Ğ", "Ü"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ş", "İ"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "Ö", "Ç", "SİL"],
];

interface Props {
  onKey: (key: string) => void;
}

export const VirtualKeyboard = ({ onKey }: Props) => {
  return (
    <div
      className="w-full mt-2 max-w-3xl mx-auto rounded-xl py-1 sm:py-2
       px-1 sm:px-2 select-none bg-[#002966]"
    > {/* en dış kısım, klavyenin kasası */}
      {ROWS.map((rows, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex w-full my-1 gap-1 sm:gap-1.5 touch-none 
          `}
        >
          {" "}
          {/* satırlar */}
          {rows.map((key) => {
            const isNotStr = key === "ENTER" || key === "SİL";
            return (
              <button
                key={key}
                onClick={() => onKey(key)}
                className={`
                h-10 sm:h-12 flex items-center justify-center  cursor-pointer
                rounded-sm font-semibold transition-all duration-75 flex-1 min-w-[20px] sm:min-w-10

                active:scale-95 active:shadow-inner active:bg-[rgba(255,255,255,0.6)]
                ${
                  isNotStr
                    ? "flex-[1.5] px-2 bg-[#0052CC] text-white uppercase tracking-wider shadow-sm text-[2.5vw] sm:text-[10px]"
                    : "flex-1 min-w-7 sm:min-w-10 bg-white text-slate-700 shadow-[0_4px_0_0_rgba(0,0,0,0.1)] hover:bg-slate-50 border border-slate-100 text-[4vw] sm:text-lg"
                }
            `}
              >
                {key === "SİL" ? (
                  <DeleteIcon />
                ) : key === "ENTER" ? (
                  <EnterIcon />
                ) : (
                  key
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

/* export const handleVirtualKey = (key: string) =>{
    if(key === "ENTER"){
        //kontrolEt() fonk buraya gelecek
    }
} */
