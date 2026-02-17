export const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 sm:w-6 sm:h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
export const PassIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 sm:w-6 sm:h-6"
  >
    {" "}
    {/* İlk Ok */} <path d="M13 17l5-5-5-5" /> {/* İkinci Ok */}{" "}
    <path d="M6 17l5-5-5-5" />{" "}
  </svg>
);
export const QuestionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    shapeRendering="geometricPrecision"
    className="w-4 h-4 sm:w-6 sm:h-6"
  >
    {/* Soru işareti gövdesi */}
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    {/* Alt nokta */}
    <line x1="12" y1="17" x2="12.01" y2="17" />
    {/* Dış daire */}
    <circle cx="12" cy="12" r="10" />
  </svg>
);

export const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#22c55e" // text-green-500
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const HintIconSub = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#3b82f6" // text-blue-500
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </svg>
);

export const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Dış Çember */}
    <circle cx="12" cy="12" r="10" />
    {/* i harfinin gövdesi */}
    <line x1="12" y1="16" x2="12" y2="12" />
    {/* i harfinin noktası */}
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

export const BackIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="group-hover:-translate-x-2 transition-transform"
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

export const ArrowIcon = () => (
  <svg
    className="w-10 h-5 ml-2 -mr-1 group-hover:translate-x-1 transition-transform"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

export const DownArrowIcon = () => (
  <svg
    className="w-4 h-4 text-white/50"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

export const SparklesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
  </svg>
);

export const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    shapeRendering="geometricPrecision"
    //className="inline-block mr-2" // Metinle hizalamak için
  >
    <path d="M7 7l10 5-10 5V7z" />
  </svg>
);

export const PauseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
    shapeRendering="geometricPrecision"
    className="w-5 h-5 sm:w-7 sm:h-7"
  >
    <line x1="8" y1="7" x2="8" y2="17" />
    <line x1="16" y1="7" x2="16" y2="17" />
  </svg>
);

export const CorrectIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
    shapeRendering="geometricPrecision"
    className="w-5 h-5 sm:w-7 sm:h-7"
  >
    <polyline points="5 13 10 17 19 7" />
  </svg>
);

export const WrongIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
    shapeRendering="geometricPrecision"
    className="w-5 h-5 sm:w-7 sm:h-7"
  >
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </svg>
);

export const HintIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    shapeRendering="geometricPrecision"
    className="w-5 h-5 sm:w-7 sm:h-7"
  >
    {/* bulb */}
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M12 2a7 7 0 0 0-4 12c.6.6 1 1.3 1 2h6c0-.7.4-1.4 1-2a7 7 0 0 0-4-12z" />

    {/* tiny sparkle */}
    <line x1="4" y1="10" x2="4" y2="10" />
    <line x1="20" y1="8" x2="20" y2="8" />
  </svg>
);

export const EnterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 sm:w-6 sm:h-6"
  >
    <polyline points="9 10 4 15 9 20" />
    <path d="M20 4v7a4 4 0 0 1-4 4H4" />
  </svg>
);

export const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 sm:w-6 sm:h-6"
  >
    <path d="M21 4H8l-5 8 5 8h13z" />
    <line x1="16" y1="9" x2="12" y2="15" />
    <line x1="12" y1="9" x2="16" y2="15" />
  </svg>
);

export const SendIcon = () => (
  <svg
    className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
  </svg>
);

export const ZapIcon = () => (
  <svg
    className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 group-hover:text-yellow-400 transition-all duration-300"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

export const FingerprintIcon = () => (
  <svg
    className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10" />
    <path d="M5 15c0-3.866 3.134-7 7-7s7 3.134 7 7" />
    <path d="M8 18c0-2.21 1.79-4 4-4s4 1.79 4 4" />
    <path d="M12 12v1" />
  </svg>
);

export const EyeIcon = () => (
  <svg
    className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* 1. KATMAN: Dış Çerçeve */}
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />

    {/* 2. KATMAN: Hafif İç Derinlik (Gölge) */}
    <circle cx="12" cy="12" r="7" className="opacity-5" fill="currentColor" />

    {/* 3. KATMAN: Küçültülmüş Göz Bebeği (Daha odaklı) */}
    <circle
      cx="12"
      cy="12"
      r="2.2" /* Burayı küçülttük */
      fill="currentColor"
      className="animate-pupil"
    />

    {/* 4. KATMAN: Mercek Parlaması (Bebeğe yaklaştırdık) */}
    <circle
      cx="13"
      cy="11"
      r="0.7"
      fill="white"
      className="animate-glare opacity-90"
    />
  </svg>
);
