export  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    const pad = (n: number) => (n < 10 ? "0" + n : n);
    return `${pad(mins)}:${pad(secs)}`;
  };