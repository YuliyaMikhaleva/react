export const timeoutScheduler = () => (next) => (action) => {
  const delay = action?.meta?.delay; //свойство задержки
  if (!delay) {
    //если этого свойства нет
    return next(action); //то вызовем нашу функцию next и передадим туда action
  }
  //а если это свойство есть вызываем запустим нашу функцию next с каким-то таймаутом, указанным в свойстве delay
  const timeoutId = setTimeout(() => next(action), delay);
  return function clear() {
    clearInterval(timeoutId);
  };
};
