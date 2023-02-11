const COLORS_TO_RANDOM: string[] = [
  "#b71c1c",
  "#4a148c",
  "#2e7d32",
  "#e65100",
  "#2962ff",
  "#c2185b",
  "#FFCD00",
  "#3e2723",
  "#03a9f4",
  "#827717",
];

const DEFAULT_RANDOM_COLOR = '#454545';

const API_URL: string = process.env.REACT_APP_API_URL || '';

export {
  COLORS_TO_RANDOM,
  DEFAULT_RANDOM_COLOR,
  API_URL
}