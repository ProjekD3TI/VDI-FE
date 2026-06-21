export const formatUptime = (seconds: number): string => {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  // Fungsi kecil untuk menambahkan angka "0" di depan jika digit kurang dari 2
  const pad = (num: number) => String(num).padStart(2, "0");

  return `${pad(days)}d:${pad(hours)}h:${pad(minutes)}m`;
};
