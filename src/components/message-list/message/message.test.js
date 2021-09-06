import { Message } from "./message";
import React from "react";
import { renderWithRedux } from "../../../utils/render-with-redux";

let state = null;

//перед каждым тестом мы состояние делаем новым
//Теперь даже если наш редюссер работает с мутацией, на работоспособность других тестов это никак не влияет.
beforeEach(() => {
  state = {
    messages: {
      messages: {
        room1: [
          {
            id: 1,
            author: "User",
            message: "Привет",
            date: new Date().toLocaleTimeString(),
          },
        ],
      },
    },
  };
});

describe("message component", () => {
  it("should render message ", () => {
    const { container } = renderWithRedux(
      <Message id="1" author="User" message="Привет" date="12.12.12" />,
      {
        initialState: state,
      },
    );
    //проверяем, что элемент с классом ".userName" имеет текстконтент "User"
    expect(container.querySelector(".userName")).toHaveTextContent("User");
    expect(container.querySelector(".textMessage")).toHaveTextContent("Привет");
    expect(container.querySelector(".date")).toHaveTextContent("12.12.12");
  });
});
