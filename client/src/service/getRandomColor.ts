const DEFAULT = [
  "#F44336", // red
  "#388E3C", // green
  "#3F51B5", // indigo
  "#FF9800", // orange
  "#9C27B0", // purple
  "#795548", // brown
  "#03A9F4", // light blue
  "#627a86", // blue grey
  "#620E00", // maroon
  "#f05fae", // bright purple
  "#b49666", // light brown
  "#257275", // blue green
  "#7f5075", // medium purple
  "#2a7287", // slate blue
  "#5973d6", // royal blue
  "#e31a1c", // red
  "#1f78b4", // dark blue
  "#33a02c", // dark green
  "#6a3d9a", // dark purple
];

const DARK_12 = [
  "#fb9a99", // pink
  "#ffff99", // yellow
  "#778899", // slate gray
  "#cab2d6", // light purple
  "#b15928", // brown
];

const LIGHT_12 = [
  "#fb8072", // red
  "#80b1d3", // light blue
  "#b3de69", // green
  "#fdb462", // orange
  "#fccde5", // light purple
  "#8dd3c7", // Aqua
  "#ffffb3", // light yellow
  "#bebada", // purple
  "#ccebc5", // light green
  "#ffed6f", // dark yellow
  "#778899", // gray
  "#bc80bd", // dark purple
];

const palettes = {
  DEFAULT: DEFAULT,
  LIGHT_12: LIGHT_12,
  DARK_12: DARK_12,
};

type paletteOptions = "DEFAULT" | "LIGHT_12" | "DARK_12";
export const getRandomColor = (color: paletteOptions) => {
  const colorScheme: string[] = palettes[color];
  return colorScheme[Math.floor(Math.random() * colorScheme.length)];
};
