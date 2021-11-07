import { Solarized_light, Solarized_dark, Monokai, Clouds, GitHub } from "themes";

const defineNewThemes = (monaco: any) => {
  monaco.editor.defineTheme("solarized-light", Solarized_light);
  monaco.editor.setTheme("solarized-light");

  monaco.editor.defineTheme("solarized-dark", Solarized_dark);
  monaco.editor.setTheme("solarized-dark");

  monaco.editor.defineTheme("monokai", Monokai);
  monaco.editor.setTheme("monokai");

  monaco.editor.defineTheme("clouds", Clouds);
  monaco.editor.setTheme("clouds");

  monaco.editor.defineTheme("github", GitHub);
  monaco.editor.setTheme("github");
};

export default defineNewThemes;
