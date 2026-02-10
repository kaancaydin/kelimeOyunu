import { useState } from "react";
import { CloseIcon, InfoIcon } from "./Icons";

export const InfoTab = () => {
  const [infoTab, setInfoTab] = useState(false);

  return (
    <>
      <button
        className="cursor-pointer absolute top-5 right-5 
    hover:scale-110 active:brightness-125 transition-all duration-150"
        onClick={() => {
          setInfoTab(true);
        }}
      >
        <InfoIcon />
      </button>
      {infoTab && (
        <div className="z-50 backdrop-blur-md fixed inset-0 bg-black/30 flex justify-center items-center">
          <div className="relative bg-linear-to-l from-blue-500 to-blue-400 flex flex-col gap-5 justify-center items-center text-black p-8 rounded-xl shadow-2xl border">
            <p className="text-2xl text-white">
              Oyun hakkındaki bilgiler burada yer alacaktır.
            </p>
            <button
              className="cursor-pointer absolute top-2 right-2"
              onClick={() => {
                setInfoTab(false);
              }}
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
