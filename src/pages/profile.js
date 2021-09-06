import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ProfileForm } from "../components/profileForm";
import styles from "../profile.module.css";
import { toggleNameVisible } from "../store/profile";

function Profile() {
  const nameVisible = useSelector((state) => state.profile.nameVisible); //вытаскиваем данные
  const dispatch = useDispatch();
  return (
    <div className={styles.pageProfile}>
      <div className={styles.profile}>
        <img
          className={styles.profileLogo}
          src={process.env.PUBLIC_URL + "/logoDialog.png"}
          width="200"
        />
        <h1 className={styles.profileTitle}>Личный кабинет</h1>
        <button
          className={styles.profileBtn}
          onClick={() => {
            dispatch(toggleNameVisible());
          }}
        >
          Показать / Скрыть
        </button>
        {nameVisible && <ProfileForm />}
      </div>
      <Link to="/chat" style={{ textDecoration: "none" }}>
        <button className={styles.btnToChat}>Вернуться в чат</button>
      </Link>
    </div>
  );
}
export default Profile;
