import * as palettes from "./palettes.ts";
import { colorsToTheme, convertPaletteToColors } from "./generate.ts";
// @deno-types="npm:@types/chroma-js@2"
import Chroma from "chroma";
const { oklch } = Chroma;

const darkColors = convertPaletteToColors(
  palettes.dark,
  {
    primary: "purple",
    secondary: "blue",
  },
  "dark",
);
export const dark = colorsToTheme(
  {
    name: "Dark",
    baseShade: 600,
    brightShade: 700,
    polarity: "dark",
  },
  darkColors,
  {
    lightness: 1,
    contrast: 1,
    saturation: 100,
  },
  (background) => ({
    background: background.set("oklch.l", 0.14).set("oklch.c", 0.03),
    surface: background.set("oklch.l", 0.16).set("oklch.c", 0.055),
    overlay: background.set("oklch.l", 0.2).set("oklch.c", 0.055),
  }),
);

const lightColors = convertPaletteToColors(
  palettes.light,
  {
    primary: "purple",
    secondary: "blue",
  },
  "light",
);

export const light = colorsToTheme(
  {
    name: "Light",
    baseShade: 200,
    brightShade: 300,
    polarity: "light",
  },
  lightColors,
  {
    lightness: 90,
    contrast: 1.2,
    saturation: 150,
  },
  (_background) => ({
    background: oklch(0.97, 0.02, 284),
    surface: oklch(0.965, 0.02, 284),
    overlay: oklch(0.96, 0.02, 284),
  }),
);
