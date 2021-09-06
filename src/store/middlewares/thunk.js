export const thunk = (store) => (next) => (action) => {
  //если тип нашего action - Функция,
  if (typeof action === "function") {
    action(store.dispatch, store.getState); //вызываем эту функцию
    return;
  }
  //если тип нашего action - объект, то мы вызываем next и передаем туда action.
  return next(action);
};
