import {
  BackgroundColor,
  Color,
  ContrastColor,
  CssColor,
  Theme as LeonardoTheme,
} from "@adobe/leonardo-contrast-colors";
import {
  BackgroundColors,
  CustomColors,
  KeyColors,
  Polarity,
  Theme,
} from "./palettes.ts";
// @deno-types="npm:@types/chroma-js@2"
import Chroma from "chroma";
import { objectEntries } from "./lib.ts";
import chroma from "chroma";

export const convertPaletteToColors = (
  palette: KeyColors<Chroma.Color>,
  extraKeys: Record<
    keyof CustomColors<Chroma.Color>,
    keyof KeyColors<Chroma.Color>
  >,
  polarity: Polarity,
) => {
  const ratios = [20.21, 36.7, 51.69, 65.16, 77.09, 87.03, 94.93, 98.99];

  const asColor = (name: string, color: Chroma.Color): Color => {
    return new Color({
      name,
      colorKeys: [color.hex() as CssColor],
      ratios,
      colorspace: "LCH",
      smooth: true,
      output: "LCH",
    });
  };

  const asBackground = (name: string, color: Chroma.Color): BackgroundColor => {
    return new BackgroundColor({
      name,
      colorKeys: [color.hex() as CssColor],
      ratios,
      colorspace: "OKLCH",
      smooth: true,
      output: "LCH",
    });
  };

  const colors = objectEntries(palette).map(([name, oklch]) =>
    asColor(name, oklch),
  );

  for (const [extraKey, value] of objectEntries(extraKeys)) {
    colors.push(asColor(extraKey, palette[value]));
  }

  const backgroundColor = asBackground("base", palette.base);

  return {
    colors,
    backgroundColor,
  };
};

export const colorsToTheme = (
  {
    name,
    baseShade,
    brightShade,
    polarity,
  }: { name: string; baseShade: Shade; brightShade: Shade; polarity: Polarity },
  {
    colors,
    backgroundColor,
  }: { colors: Color[]; backgroundColor: BackgroundColor },
  {
    lightness,
    contrast,
    saturation,
  }: { lightness: number; contrast: number; saturation: number },
  generateBackground: (
    background: Chroma.Color,
  ) => BackgroundColors<Chroma.Color>,
): Theme => {
  const theme = new LeonardoTheme({
    colors,
    backgroundColor,
    lightness,
    contrast,
    saturation,
    output: "LCH",
    formula: "wcag3",
  });

  const { background: bgStr } = theme.contrastColorPairs;

  const [l, c, h] = bgStr
    .replace("lch(", "")
    .replace(")", "")
    .split(",")
    .map((val) => parseFloat(val));

  const background = chroma.lch(l, c, h);

  const backgrounds = generateBackground(background);

  return {
    name,
    theme,
    polarity,
    backgrounds: backgrounds,
    baseShade,
    brightShade,
  };
};

export type Shade = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800;
export type ColorShades = Record<Shade, CssColor>;
export type ColorObject = Record<
  keyof CustomColors<Chroma.Color> | keyof KeyColors<Chroma.Color>,
  ColorShades
>;

export const colorListToObj = (colors: ContrastColor[]): ColorObject =>
  colors.reduce((acc, { name, values }) => {
    acc[name as keyof ColorObject] = values.reduce(
      (acc, { name: shadeName, value }) => {
        acc[Number(shadeName.replace(name, "")) as Shade] = value;
        return acc;
      },
      {} as ColorShades,
    );
    return acc;
  }, {} as ColorObject);
