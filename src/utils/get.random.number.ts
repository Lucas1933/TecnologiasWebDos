export default function getRandomNumber(min: number, max: number) {
  if (typeof min !== "number" || typeof max !== "number") {
    throw new Error("Both arguments must be numbers");
  }
  if (min >= max) {
    throw new Error("The first argument must be smaller than the second one");
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
