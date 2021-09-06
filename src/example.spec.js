//пример теста

//У нас есть функция, которая должна вернуть строку:
export function formatTimeStrings(strings = []) {
  if (strings.length > 1) {
    //если длина строки > 1
    return `${strings[0]} - ${strings[strings.length - 1]}`; //то формат такой: "первый элемент - 1"
  }

  if (strings.length) {
    //если длина строки не 0
    return `${strings[0]} - Till tomorrow`; //то формат такой: "первый элемент - Till tomorrow"
  }

  return `None`; //иначе "None"
}
//тестим параллельно в консоли

//Пишем тест с помощью функции describe
describe("example", () => {
  //тест функционала с массивом чисел
  it("should call with numbers array", () => {
    const result = formatTimeStrings([1, 2, 3, 4]); //в колбеке вызываем нашу функцию и передаем в массив 1,2,3,4 и результат должен получиться 1-4
    //мы должны проверить, что результат, который вернет наша функция, равен результату, который должен быть (1-4) - для этого есть ключевое словое expect

    //result = то, что мы ожидаем
    //toBe = равен
    //"1-4" - результат, который должен быть
    //результат будет равен 1-4
    expect(result).toBe("1 - 4");
  });

  //тест функционала с массивом из 1 числа
  it("should call with 1 number array", () => {
    const result = formatTimeStrings([1]);
    expect(result).toBe("1 - Till tomorrow");
  });

  //тест функционала, если ничего не передаем
  it("should call without numbers array", () => {
    const result = formatTimeStrings([]);
    expect(result).toBe("None");
  });
});
