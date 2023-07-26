export const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
};

export const minutesToSeconds = (time: string) => {
  const [min, sec] = time.split(":").map(Number);
  const totalSec = min * 60 + sec;
  return totalSec;
};
