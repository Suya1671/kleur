import { Theme } from "../palettes.ts";
import { handlebars, toHandlebarsContext } from "./mustache.ts";
// @ts-types="npm:@types/chroma-js@2"
import chroma from "chroma";

const toZedTheme = async (theme: Theme) => {
  const context = toHandlebarsContext(theme);
  return await handlebars.renderView("zed-theme", context);
};

// TODO: use fancy handlebars stuff to make this simpler
export const toZedThemes = async (themes: Theme[]) => {
  const template = await Deno.readTextFile("templates/zed.mustache");
  const themesString = await Promise.all(
    themes.map((theme) => toZedTheme(theme)),
  ).then((arr) => arr.join(",\n"));
  return template.replace("{{themes}}", themesString);
};
