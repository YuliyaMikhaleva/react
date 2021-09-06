import React from "react";
import { ChatList } from "./index";
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
  };
});

describe("chatList component", () => {
  //рендер чат-листа, данные из пропсов
  it("should render chatList with title prop", () => {
    const { container } = renderWithRedux(<ChatList />, { initialState: state.conversations });
    expect(container.querySelector(".btn")).toHaveTextContent("Добавить беседу");
  });
});
