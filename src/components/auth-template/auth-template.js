//Это наш template
//Он будет возвращать нашего чилдрена, а ниже он будет возвращать компонент link
import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";

const useStyles = makeStyles(() => {
  return {
    link: {
      display: "flex",
      justifyContent: "center",
      marginTop: 30,
      color: "#000",
    },
    root: {
      width: 500,
      margin: "0 auto",
      marginTop: "10%",
    },
  };
});
export function AuthTemplate({ children, link }) {
  const styles = useStyles(); //создадим хук useStyles
  return (
    <div className={styles.root}>
      {children}
      <div className={styles.link}>{link}</div>
    </div>
  );
}
