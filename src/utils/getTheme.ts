import { isKeyboardTheme, type KeyboardTheme } from "../virtualKeyboard/KeyboardPalettes";


export const getTheme = (): KeyboardTheme => {
  const saved = localStorage.getItem("keyboardTheme");

  if (saved && isKeyboardTheme(saved)) {
    return saved;
  }

  return "defaultMode";
};
