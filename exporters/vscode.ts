import { Theme } from "../palettes.ts";
import { handlebars, toHandlebarsContext } from "./mustache.ts";

export const toVscodeTheme = async (theme: Theme) => {
  const context = toHandlebarsContext(theme);
  return await handlebars.renderView("vscode", context);
};
