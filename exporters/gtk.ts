import { Theme } from "../palettes.ts";
import { handlebars, toHandlebarsContext } from "./mustache.ts";

export const toGtk3Theme = async (theme: Theme) => {
  const context = toHandlebarsContext(theme);
  return await handlebars.renderView("gtk-3", context);
};

export const toGtk4Theme = async (theme: Theme) => {
  const context = toHandlebarsContext(theme);
  return await handlebars.renderView("gtk-4", context);
};
