import { useState, useContext, useCallback, createContext } from "react";

//функция createContext принимает начальное значение
const CounterContext = createContext(1);

//провайдер -функция, которая принимает чилдрена, и возвращает контекст провайдера, и внутри него мы вернем чилдрена
export const CounterProvider = ({ children, count }) => {
  return <CounterContext.Provider value={count}>{children}</CounterContext.Provider>;
};

//создаем просто хук, который будет принимать начальное значение 0 (возвращаем его наружу)
export const useCounter = (value = 0) => {
  const [count, setCount] = useState(value);
  //далее заюзаем провайдер, наш контекст - для этого есть хук useContext
  const step = useContext(CounterContext);

  //сделаем функцию increment и обернем ее в useCallback - она будет вызывать setCount
  const increment = useCallback(() => setCount((count) => count + step), [step]);
  //сделаем функцию incremenet ассинхронной - она будет вызываться в сеттаймауте
  const incrementAsync = useCallback(() => setTimeout(increment, 100), [increment]);
  const reset = useCallback(() => setCount(value), [value]);
  if (count > 900) {
    throw Error("ooops 9000");
  }
  return {
    count,
    increment,
    incrementAsync,
    reset,
  };
};
