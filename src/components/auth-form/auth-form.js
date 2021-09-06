//это форма регистрации: мы будем ее использовать в 2х местах: для входа и для регистрации
import { Input, Button, makeStyles } from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles(() => {
  return {
    input: {
      color: "#007cad",
      padding: "10px 15px",
      fontSize: "15px",
      fontWeight: "bold",
      marginBottom: 15,
    },
    root: {
      "& h1": {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 50,
        textAlign: "center",
      },
    },
  };
});

export function LoginForm({ title, submitButton, onSubmit }) {
  const styles = useStyles();
  const [email, setEmail] = useState(""); //локальное состояние нашей почты, изначально - пустая строка
  const [password, setPassword] = useState(""); //локальное состояние нашего пароля, изначально - пустая строка
  const [error, setError] = useState("");
  const handleSubmit = async () => {
    try {
      await onSubmit(email, password);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className={styles.root}>
      <h1>{title}</h1>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth={true}
        placeholder="Email"
        className={styles.input}
      />
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth={true}
        placeholder="Password"
        className={styles.input}
        type="password"
      />
      <Button variant="text" fullWidth={true} onClick={handleSubmit}>
        {submitButton}
      </Button>
    </div>
  );
}
