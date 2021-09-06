import { ThemeProvider } from "@material-ui/core";
import React, { createContext, useCallback, useState } from "react";

export const ThemeContext = createContext(); //создадим объект Context;

//теперь когда реакт рендерит компонент, который подписался на изменение этого объекта, реакт получит
// текущее значение из ближайших контекстов
// у ThemeContext есть свойство Provider - позволяет дочерним компонентам подписываться на его изменения

//функция DefaultThemeProvider возвращает наружу провайдер из контекста
export const DefaultThemeProvider = ({ children, themes, initialTheme }) => {
  //наружу мы вернему тему и рачаг, которым ее можно менять
  const [theme, setTheme] = useState({
    //тема - это объект с ключами
    theme: themes[initialTheme], // по ключу обращаемся к текущей теме
    name: "мятная", //имя текущей темы
  });

  //изменение темы
  const changeTheme = useCallback(
    (name) => {
      if (themes[name]) {
        //если среди тем есть такая тема (по имени)
        setTheme({ name, theme: themes[name] }); //то меняем эту тему и меняем название
      }
    },
    [themes],
  ); //в зависимости поставим темы

  //тему и рычаг переключения темы  передаем в пропс провайдера value - тогда она попадет в провайдер, а он передаст дочерним компонентам
  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <ThemeProvider theme={theme.theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
