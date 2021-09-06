import React from "react";
import { MessageList } from "./index";
import { renderWithRedux } from "../../utils/render-with-redux";
import { nanoid } from "nanoid";

let state = null;

//перед каждым тестом мы состояние делаем новым
//Теперь даже если наш редюссер работает с мутацией, на работоспособность других тестов это никак не влияет.
beforeEach(() => {
  state = {
    conversations: [
      { id: 1, title: "room1", value: "test value 1" },
      { id: 2, title: "room2", value: "test value 2" },
    ],
    messages: {
      messages: { room1: [{ author: "User", message: "Test" }] },
    },
  };
});

describe("messageList component", () => {
  //рендер чат-листа, данные из пропсов
  it("should render messageList with title prop", () => {
    const { container } = renderWithRedux(<MessageList />, { initialState: state.conversations });
    //проверяем, что элемент с классом ".text" имет текст "Введите сообщение"
    expect(container.querySelector(".text")).toHaveTextContent(
      "Введите сообщениеВведите сообщение",
    );
  });
});
