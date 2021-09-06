import React from "react";
import { Chat } from "./index";
import { renderWithRedux } from "../../../utils/render-with-redux";

let state = null;

//перед каждым тестом мы состояние делаем новым
//Теперь даже если наш редюссер работает с мутацией, на работоспособность других тестов это никак не влияет.
beforeEach(() => {
  state = {
    messages: {
      messages: { room1: [{ author: "User", message: "Test" }] },
    },
  };
});

describe("chat component", () => {
  //рендер чата, данные из пропсов
  it("should render chat with title prop", () => {
    const { container } = renderWithRedux(<Chat title="room1" />, { initialState: state });

    //проверяем, что элемент с классом ".chatName" имеет textContent 'room1'
    expect(container.querySelector(".chatName")).toHaveTextContent("room1");
  });

  it("should render chat with selected prop", () => {
    const { container } = renderWithRedux(<Chat title="room1" selected={true} />, {
      initialState: state,
    });
    //проверяем, что selected элемент действительно room1
    expect(container.querySelector(".Mui-selected")).toHaveTextContent("room1");
  });
});
