import { objectEntries } from "../lib.ts";
import { Theme } from "../palettes.ts";
import { themeToColors } from "./outputConversion.ts";

/**
 * Converts an theme to a CSS string
 * @param theme A theme
 * @returns A CSS string
 */
export const toCss = (inputTheme: Theme) => {
  const { background, overlay, surface, ...shades } = themeToColors(
    inputTheme,
    (color) => color.oklch(),
    "LCH",
  );

  const backgroundStr = objectEntries({ background, overlay, surface }).map(
    ([name, [l, c, h]]) => `--${name}: oklch(${l} ${c} ${h});`,
  );

  const themeStr = objectEntries(shades)
    .flatMap(([name, color]) =>
      objectEntries(color).map(
        ([shadeName, shadeColor]) =>
          `--${name}-${shadeName}: ${shadeColor.replaceAll(",", "")};`,
      ),
    )
    // .map((line) => line.replace("deg", ""))
    .join("\n");

  return `:root {
  ${backgroundStr.join("\n")}
  ${themeStr}
}`;
};

/**
 * Uses light-dark to create a combined CSS string
 */
export const combinedCssTheme = (light: Theme, dark: Theme) => {
  const {
    background: lightBackground,
    overlay: lightOverlay,
    surface: lightSurface,
    ...lightShades
  } = themeToColors(light, (color) => color.oklch(), "LCH");

  const {
    background: darkBackground,
    overlay: darkOverlay,
    surface: darkSurface,
    ...darkShades
  } = themeToColors(dark, (color) => color.oklch(), "LCH");

  const backgroundStr = objectEntries({
    background: [lightBackground, darkBackground] as const,
    overlay: [lightOverlay, darkOverlay] as const,
    surface: [lightSurface, darkSurface] as const,
  }).map(
    ([name, [[lightl, lightc, lighth], [darkl, darkc, darkh]]]) =>
      `--${name}: light-dark(oklch(${lightl} ${lightc} ${lighth}), oklch(${darkl} ${darkc} ${darkh}));`,
  );

  const themeStr = objectEntries(lightShades)
    .flatMap(([name, color]) =>
      objectEntries(color).map(
        ([shadeName, shadeColor]) =>
          `--${name}-${shadeName}: light-dark(${shadeColor.replaceAll(",", "")}, ${darkShades[name][shadeName].replaceAll(",", "")});`,
      ),
    )
    .join("\n");

  const defaultShadeStr = objectEntries(lightShades)
    .flatMap(([name, color]) => [
      `--${name}: light-dark(${color[light.baseShade].replaceAll(",", "")}, ${darkShades[name][dark.baseShade].replaceAll(",", "")});`,
      `--${name}-bright: light-dark(${color[light.brightShade].replaceAll(",", "")}, ${darkShades[name][dark.brightShade].replaceAll(",", "")});`,
    ])
    .join("\n");

  return `:root {
  ${backgroundStr.join("\n")}
  ${themeStr}
  ${defaultShadeStr}
}`;
};
