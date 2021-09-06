import { useCounter } from "./useCounter";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
//рендерХук возвращает какой-то результат и принимает колбек, в колбек мы помещаем наш useCounter

describe("useCounter", () => {
  //вызов useCounter
  it("should call useCounter", () => {
    const { result } = renderHook(() => useCounter());
    //проверяем, что count который мы вернули из хука равен 0
    expect(result.current.count).toBe(0);
    //для result есть поле current – это как раз то, что мы вернули из useCounter
    //проверяем, что у нас вообще есть функция increment
    expect(typeof result.current.increment).toBe("function");
  });
  //вызов increment
  it("should call increment", () => {
    const { result } = renderHook(() => useCounter()); //вызываем хук
    act(() => {
      result.current.increment(); //вызываем increment
    });
    //проверяем, что после инкремента count стал равен 1
    expect(result.current.count).toBe(1);
  });
  //вызов Increment с начальным значением 10
  it("should call increment with initial value", () => {
    const { result } = renderHook(() => useCounter(10)); //вызываем хук
    act(() => {
      result.current.increment(); //вызываем increment
    });
    expect(result.current.count).toBe(11);
  });

  it("should call reset", () => {
    //помио result у нас есть такая фукнкция rerender - чтобы апдейтить хук
    //мы можем вызвать эту функцию и передать новое значение начального состояния - то есть это просто update
    const { result, rerender } = renderHook(({ initialValue }) => useCounter(initialValue)); //вызываем хук
    rerender({ initialValue: 10 }); //передаем в начальное состояние 10
    act(() => {
      result.current.reset(); //вызываем reset в акте
    });
    //проверяем, что count = 10
    expect(result.current.count).toBe(10);
  });

  //вызов асинхронного метода: нам нужно ждать эти апдейты
  //renderHook возвращает помимо result и rerender еще  waitForNextUpdate
  // - функцию, которая ждет nextUpdate хука  и после этого вызывается
  it("should call increment Async", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCounter(0));

    result.current.incrementAsync(); //ассинхронные функции можно вызывать без act

    //ждем nextUpdate
    await waitForNextUpdate();

    //проверяем, что count =1
    expect(result.current.count).toBe(1);
  });
});
