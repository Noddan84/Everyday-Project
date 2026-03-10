// explore.js
export const letterSets = {
  green: ["A", "S", "T"],
  yellow: ["B", "L", "M", "N", "R"],
  blue: ["F", "K", "P", "Å", "Ä", "Ö"],
  red: ["Q", "W", "Z", "X", "C"]
};

export const levelColors = {
  green: "#2e7d32",
  yellow: "#f9a825",
  blue: "#1565c0",
  red: "#c62828"
};

export function getRandomLetter(level) {
  const set = letterSets[level];
  return set[Math.floor(Math.random() * set.length)];
}