import { TOGGLE_NAME_VISIBLE, EDIT_DATA, SAVE, EDIT_USER } from "./types";
// import {withMobileDialog} from "@material-ui/core";

//2. Создадим тут объект, а у него будет свойство count = 0
//это значение приравниваем к state
const initialState = {
  nameVisible: false,
  user: {
    firstName: "Ваня",
    soName: "Иванов",
    age: "28",
    birthDay: "05.01.1993",
  },
  edit: false, //изначально - редактировать нельзя
};

//1. создадим редюссер - чистая функция,
// которая вычисляет наше следующее состояние.
export const profileReducer = (state = initialState, action) => {
  //мы посмотрим что action у нас пришел с типом
  switch (action.type) {
    case TOGGLE_NAME_VISIBLE: //если этот тип TOGGLE_NAME_VISIBLE
      return {
        //мы что-то делаем со стоянием
        ...state,
        nameVisible: !state.nameVisible, //обновляем состояние на противоположное
      };
    case EDIT_DATA:
      return {
        ...state,
        edit: true, //при нажатии на редактирование становится можно редактировать
      };
    case SAVE:
      return {
        ...state,
        edit: false, //при нажатии на сохранение, редактирование больше невозможно
      };
    case EDIT_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      //по умолчанию если у нас нету такого типа
      return state; //мы вернем state
  }
};
