import React from "react";
import classes from "./Name.module.css";


const Name = ({ data, updateFieldHandler }) => {

  return (
    <div>
      <div className={classes.formControl}>
      <label htmlFor="user_name">UserName</label>
        <input
          type="text"
          id="lastName"
          name="user_name"
          value={data.user_name || ""}
          onChange={(e) => updateFieldHandler("user_name", e.target.value)}
          placeholder="Digite o seu usuario"
          required
        />
        <label>Nome</label>
        <input
          type="text"
          name="user_firstName"
          placeholder="Digite o seu nome"
          required
          value={data.user_firstName || ""}
          onChange={(e) => updateFieldHandler("user_firstName", e.target.value)}
        />
        <label htmlFor="name">Sobrenome</label>
        <input
          type="text"
          id="lastName"
          name="user_lastName"
          value={data.user_lastName || ""}
          onChange={(e) => updateFieldHandler("user_lastName", e.target.value)}
          placeholder="Digite o seu sobrenome"
          required
        />
        <label htmlFor="data">Data de Nascimento</label>
        <input
          type="date"
          id="data"
          name="user_birthday"
          value={data.user_birthday || ""}
          onChange={(e) => updateFieldHandler("user_birthday", e.target.value)}
          required
        />
      </div>
    </div>
  );
};

export default Name;
