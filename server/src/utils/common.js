export function getRandomSalt() {
  return Math.random()
    .toString()
    .slice(2, 5);
}
