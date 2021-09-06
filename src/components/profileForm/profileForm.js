import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; //благодаря этому хуку мы заберем наше состояние
import { editData, editUser, save } from "../../store/profile";
import styles from "./profileForm.module.css";

export const useFormInput = function (initialValue) {
  //начальное состояние инпута = initialValue
  const [value, setValue] = useState(initialValue);
  //value - настоящее состояние, изменить можно через setValue

  //функция клика принимает even t(то что мы ввели)
  const handleChange = function (event) {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  }; //и изменяет настоящее состояние значение на то что мы ввели В конкретном инпуте, найденном по атрибуту name

  return {
    //возвращаем значение, название и функцию по клику
    value,
    onChange: handleChange, //вот этот слушатель вставим в инпут редактирования параметров
  };
};

export const ProfileForm = () => {
  const { firstName, soName, age, birthDay } = useSelector((state) => state.profile.user); //вытаскиваем данные по ключу - например firstName - Выведет Ваня

  const user = useSelector((state) => state.profile.user); //вытаскиваем данные по ключу стейта user

  // console.log(user);

  const form = useFormInput({
    firstName: user.firstName,
    soName: user.soName,
    age: user.age,
    birthDay: user.birthDay,
  });

  // console.log(form.value);

  const edit = useSelector((state) => state.profile.edit); //вытаскиваем данные : можно ли редактировать

  const dispatch = useDispatch(); //чтобы использовать функции
  return (
    <div>
      {/* этот блок в режиме редактирования*/}
      {edit ? (
        <div>
          <label className={styles.label} htmlFor="firstName">
            Имя:
          </label>
          <input
            data-testid="firstName"
            name="firstName"
            className={styles.input}
            id="firstName"
            defaultValue={firstName}
            value={form.value.firstName}
            onChange={form.onChange}
            type="text"
            disabled={false}
          />
          <label className={styles.label} htmlFor="soName">
            Фамилия:
          </label>
          <input
            name="soName"
            className={styles.input}
            id="soName"
            defaultValue={soName}
            type="text"
            disabled={false}
            value={form.value.soName}
            onChange={form.onChange}
          />

          <label className={styles.label} htmlFor="age">
            Возраст, лет:
          </label>
          <input
            name="age"
            className={styles.input}
            id="age"
            defaultValue={age}
            type="text"
            disabled={false}
            onChange={form.onChange}
            value={form.value.age}
          />

          <label className={styles.label} htmlFor="birthDay">
            Дата рождения:{" "}
          </label>
          <input
            name="birthDay"
            className={styles.input}
            id="birthDay"
            defaultValue={birthDay}
            type="text"
            disabled={false}
            onChange={form.onChange}
            value={form.value.birthDay}
          />

          <button
            className={styles.btnEditSave}
            type="submit"
            onClick={() => {
              dispatch(editUser(form.value));
              dispatch(save());
              // console.log(state.user);
            }}
          >
            Сохранить
          </button>
        </div>
      ) : (
        /* этот блок в режиме просмотра*/
        <div>
          <label className={styles.label} htmlFor="firstName">
            Имя:{" "}
          </label>
          <input
            className={styles.input}
            id="firstName"
            defaultValue={firstName}
            type="text"
            disabled={true}
          />
          <label className={styles.label} htmlFor="soName">
            Фамилия:{" "}
          </label>
          <input
            className={styles.input}
            id="soName"
            defaultValue={soName}
            type="text"
            disabled={true}
          />
          <label className={styles.label} htmlFor="age">
            Возраст, лет:{" "}
          </label>
          <input className={styles.input} id="age" defaultValue={age} type="text" disabled={true} />
          <label className={styles.label} htmlFor="birthDay">
            Дата рождения:{" "}
          </label>
          <input
            className={styles.input}
            id="birthDay"
            defaultValue={birthDay}
            type="text"
            disabled={true}
          />
          <button
            onClick={() => {
              dispatch(editData()); //при нажатии  можно будет редактировать
            }}
            className={styles.btnEditSave}
          >
            Редактировать
          </button>
        </div>
      )}
    </div>
  );
};
