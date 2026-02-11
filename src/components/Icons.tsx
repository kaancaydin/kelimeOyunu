export const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ef4444"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {" "}
    <path d="M18 6 6 18" /> <path d="m6 6 12 12" />{" "}
  </svg>
);
export const PassIcon = () => (
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
    {" "}
    {/* İlk Ok */} <path d="M13 17l5-5-5-5" /> {/* İkinci Ok */}{" "}
    <path d="M6 17l5-5-5-5" />{" "}
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

export const HintIcon = () => (
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

export const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor" // Rengi Tailwind class'ından alması için
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block mr-2" // Metinle hizalamak için
  >
    <path d="M5 3l14 9-14 9V3z" />
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
    strokeWidth="2.5" // PlayIcon ile aynı kalınlık
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block mr-2"
  >
    {/* Klasik bir geri oku veya ters üçgen formunda */}
    <path d="M19 12H5M12 19l-7-7 7-7" />
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