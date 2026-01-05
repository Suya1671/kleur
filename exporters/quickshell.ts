import { objectEntries } from "../lib.ts";
import { Theme } from "../palettes.ts";
import { themeToColors } from "./outputConversion.ts";

/**
 * Converts an theme to a Quickshell singleton module
 * @param theme A theme
 * @returns A string of the Quickshell module file
 */
export const toQuickshell = (inputTheme: Theme) => {
  const { background, overlay, surface, ...shades } = themeToColors(
    inputTheme,
    (color) => color.hex(),
    "HEX",
  );

  const backgroundStr = objectEntries({ background, overlay, surface }).map(
    ([name, rgb]) => `readonly property color ${name}: "${rgb}";`,
  ).join("\n");

  const themeStr = objectEntries(shades)
    .flatMap(([name, color]) =>
      objectEntries(color).map(
        ([shadeName, shadeColor]) =>
          `readonly property color ${name}${shadeName}: "${shadeColor}";`,
      )
    )
    .join("\n");


  return `
    pragma Singleton
    pragma ComponentBehavior: Bound

    import QtQuick
    import Quickshell

    Singleton {
        id: root
        ${backgroundStr}
        ${themeStr}
    }
  `.trim();
}
