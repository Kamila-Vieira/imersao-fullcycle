import { HEX_LETTERS } from "../constants";

export const generateRandomColor = () => {
  const colorComplement = Array(6)
    .fill("")
    .reduce((acc, _) => (acc += HEX_LETTERS[Math.floor(Math.random() * 16)]), "");
  return `#${colorComplement}`;
};
