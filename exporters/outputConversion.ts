import {
  Colorspace,
  Theme as LeonardoTheme,
} from "@adobe/leonardo-contrast-colors";
import { colorListToObj, ColorObject } from "../generate.ts";
import { BackgroundColors, Theme } from "../palettes.ts";
import type chroma from "npm:@types/chroma-js@2";

export const convertLeonardoTheme = (
  theme: LeonardoTheme,
  output: Colorspace,
) =>
  new LeonardoTheme({
    backgroundColor: theme.backgroundColor,
    colors: theme.colors,
    lightness: theme.lightness,
    contrast: theme.contrast,
    formula: theme.formula,
    saturation: theme.saturation,
    output,
  });

export const convertTheme = (theme: Theme, output: Colorspace): Theme => {
  const newTheme = convertLeonardoTheme(theme.theme, output);

  return {
    ...theme,
    theme: newTheme,
  };
};

export const themeToColors = <T>(
  theme: Theme,
  mapBackground: (color: chroma.Color) => T,
  output: Colorspace = "HEX",
): ColorObject & BackgroundColors<T> => {
  const hexTheme = convertLeonardoTheme(theme.theme, output);

  const [_, ...colorList] = hexTheme.contrastColors;
  const colors = colorListToObj(colorList);

  return {
    background: mapBackground(theme.backgrounds.background),
    surface: mapBackground(theme.backgrounds.surface),
    overlay: mapBackground(theme.backgrounds.overlay),
    ...colors,
  };
};
