import { store } from "../index";

export const logger = () => (next) => (action) => {
  console.log("dispatching", action); //смотрим наше действие: type и payload
  console.log("prev state", store.getState()); //предыдущее состояние
  const result = next(action); //создадим переменную, в которую запишем ответ функции next и передадим наше действие дальше
  console.log("next state", store.getState()); //следующее состояние
  return result; //вернем результат
};
