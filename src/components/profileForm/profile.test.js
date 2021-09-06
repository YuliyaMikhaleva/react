import React from "react";
import { ProfileForm } from "./profileForm";
import { renderWithRedux } from "../../utils/render-with-redux";

let state = null;

//перед каждым тестом мы состояние делаем новым
//Теперь даже если наш редюссер работает с мутацией, на работоспособность других тестов это никак не влияет.
beforeEach(() => {
  state = {
    profile: {
      user: {
        firstName: "Ваня",
        soName: "Иванов",
        age: 28,
        birthDay: "05.01.1993",
      },
    },
  };
});

describe("profile component", () => {
  //рендер чат-листа, данные из пропсов
  it("should render profile", () => {
    const { container } = renderWithRedux(<ProfileForm />, { initialState: state.profile.user });
    //проверяем значения инпутов
    expect(container.querySelector("#firstName").value).toBe("Ваня");
    expect(container.querySelector("#soName").value).toBe("Иванов");
    expect(container.querySelector("#age").value).toBe("28");
    expect(container.querySelector("#birthDay").value).toBe("05.01.1993");
  });
});
