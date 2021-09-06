//обработка ошибок
export const report = () => (next) => (action) => {
  console.log("report");
  try {
    return next(action);
  } catch (e) {
    console.error("Some error: ", e);
  }
};
