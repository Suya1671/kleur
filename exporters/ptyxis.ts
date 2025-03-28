import { Theme } from "../palettes.ts";
import { handlebars, toHandlebarsContext } from "./mustache.ts";

export const toPtyxisTheme = async (lightTheme: Theme, darkTheme: Theme) => {
  const lightContext = toHandlebarsContext(lightTheme);
  const darkContext = toHandlebarsContext(darkTheme);
  return await handlebars.renderView("ptyxis", {
    lightTheme: lightContext,
    darkTheme: darkContext,
  });
};
