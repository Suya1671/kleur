// @deno-types="npm:@types/chroma-js@2"
import Chroma, { type Color } from "chroma";
const { oklch } = Chroma;
import type { Theme as LeonardoTheme } from "@adobe/leonardo-contrast-colors";
import { Shade } from "./generate.ts";

export type KeyColors<T> = {
  /** Base background color */
  base: T;
  red: T;
  orange: T;
  green: T;
  blue: T;
  teal: T;
  purple: T;
};

export type CustomColors<T> = {
  primary: T;
  secondary: T;
};

export type BackgroundColors<T> = {
  background: T;
  surface: T;
  overlay: T;
};

export type Polarity = "dark" | "light";

export type Theme = {
  name: string;
  theme: LeonardoTheme;
  polarity: Polarity;
  backgrounds: BackgroundColors<Chroma.Color>;
  baseShade: Shade;
  brightShade: Shade;
};

/** base16 colors. Used for syntax highlighting and for porting to other apps */
export type Base24<T> = {
  /** Default background */
  base00: T;
  /** Lighter background (used for status bars) */
  base01: T;
  /** Selection background */
  base02: T;
  /** Comments, Invisibles, Line Highlighting */
  base03: T;
  /** Dark foreground */
  base04: T;
  /** Light foreground */
  base05: T;
  /** Lighter foreground. White */
  base06: T;
  /** Lightest foreground. Bright white */
  base07: T;
  /** Variables, XML Tags, Markup Link Text, Markup Lists, Diff Deleted. Red */
  base08: T;
  /** Integers, Boolean, Constants, XML Attributes, Markup Link Url. Yellow */
  base09: T;
  /** Classes, Markup Bold, Search Text Background. Bright yellow */
  base0A: T;
  /** Strings, Inherited Class, Markup Code, Diff Inserted  Green */
  base0B: T;
  /** Support, Regular Expressions, Escape Characters, Markup Quotes. Cyan */
  base0C: T;
  /** Functions, Methods, Attribute IDs, Headings. Blue */
  base0D: T;
  /** Keywords, Storage, Selector, Markup Italic, Diff Changed. Purple */
  base0E: T;
  /** Deprecated, Opening/Closing Embedded Language Tags, e.g. <?php ?>. Dark brown/red */
  base0F: T;
  /** Darker background. Darker black */
  base10: T;
  /** Darkest background. Darkest black */
  base11: T;
  /** Bright red */
  base12: T;
  /** Bright yellow */
  base13: T;
  /** Bright green */
  base14: T;
  /** Bright cyan */
  base15: T;
  /** Bright blue */
  base16: T;
  /** Bright purple */
  base17: T;
};

export const dark = {
  base: oklch(0.16, 0.03, 284),
  blue: oklch(0.77, 0.2, 240),
  green: oklch(0.77, 0.2, 152),
  orange: oklch(0.77, 0.2, 83),
  purple: oklch(0.77, 0.2, 284),
  red: oklch(0.62, 0.2, 27),
  teal: oklch(0.77, 0.2, 190),
} satisfies KeyColors<Color>;

export const light = {
  base: oklch(0.97, 0.02, 284),
  blue: oklch(0.77, 0.2, 240),
  green: oklch(0.77, 0.2, 152),
  orange: oklch(0.77, 0.2, 83),
  purple: oklch(0.77, 0.2, 284),
  red: oklch(0.62, 0.2, 27),
  teal: oklch(0.77, 0.2, 190),
} satisfies KeyColors<Color>;
