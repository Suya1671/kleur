import { Handlebars } from "handlebars";
import { ColorObject } from "../generate.ts";
import { fromObjectEntries } from "../lib.ts";
import { objectEntries } from "../lib.ts";
import { BackgroundColors, Theme } from "../palettes.ts";
import { toBase24 } from "./base24.ts";
import { convertTheme, themeToColors } from "./outputConversion.ts";
// @ts-types="npm:@types/chroma-js@2"
import chroma from "chroma";

export const handlebars = new Handlebars({
  baseDir: "templates",
  extname: ".mustache",
  layoutsDir: "layouts/",
  partialsDir: "partials/",
  cachePartials: true,
  defaultLayout: "",
  compilerOptions: undefined,
  helpers: undefined,
});

export const toHandlebarsContext = (
  theme: Theme,
  extra: Record<PropertyKey, string> = {},
) => {
  const hexTheme = themeToColors(convertTheme(theme, "HEX"), (color) =>
    color.hex(),
  );
  const { palette } = toBase24(theme);
  const hexObject = {
    ...toMustacheList(theme, hexTheme),
    ...palette,
  };
  const hex: Record<string, string> = fromObjectEntries(
    objectEntries(hexObject).map(([key, value]) => [
      `${key}-hex`,
      value.startsWith("#") ? value.slice(1) : value,
    ]),
  );

  const hexDecimal: Record<string, string> = objectEntries(hexObject).reduce(
    (acc, [key, color]) => {
      const [r, g, b] = chroma(color).rgb();
      acc[`${key}-dec-r`] = r.toString();
      acc[`${key}-dec-g`] = g.toString();
      acc[`${key}-dec-b`] = b.toString();
      return acc;
    },
    {} as Record<string, string>,
  );

  // preferred over hex if available, as it's more accurate
  const lchTheme = themeToColors(convertTheme(theme, "LCH"), (color) => {
    const [l, c, h] = color.lch();
    return `lch(${l}, ${c}, ${h})`;
  });

  const lch: Record<string, string> = fromObjectEntries(
    objectEntries(toMustacheList(theme, lchTheme)).map(([key, value]) => [
      `${key}-lch`,
      value,
    ]),
  );

  const mustaceTheme = {
    "scheme-name": `Kleur ${theme.name}`,
    "scheme-author": "Kleur Contributors",
    polarity: theme.polarity,
    ...hex,
    ...hexDecimal,
    ...lch,
    ...extra,
  };

  return mustaceTheme;
};

const toMustacheList = (
  theme: Theme,
  colors: ColorObject & BackgroundColors<string>,
) =>
  objectEntries(colors).reduce(
    (acc, [key, value]) => {
      if (typeof value === "string") {
        acc[key] = value;
      } else {
        acc[key] = value[theme.baseShade];
        acc[`${key}-bright`] = value[theme.brightShade];
        // direct shade access. Not really recommended but useful for some cases
        for (const [shade, val] of objectEntries(value)) {
          acc[`${key}-${shade}`] = val;
        }
      }
      return acc;
    },
    {} as Record<string, string>,
  );
