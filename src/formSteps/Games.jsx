import React from "react";
import classes from "./Games.module.css";

const Games = ({data, updateFieldHandler}) => {

    

  return (
    <div>
      <div className={classes.formControl}>
        <label>Jogos</label>
        <div className={classes.customselect}>
          <select
            name="user_games"
            value={data.user_games}
            onChange={(e) => updateFieldHandler("user_games", e.target.value)}
          >
            <option value="CS:GO">CS:GO</option>
            <option value="Valorant">Valorant</option>
            <option value="League of Legends">League of Legends</option>
          </select>

          <div className={classes.select_arrow}></div>
        </div>
        <label>Idioma</label>
        <div className={classes.customselect}>
          <select
            name="user_idioma"
            value={data.user_idioma}
            onChange={(e) => updateFieldHandler("user_idioma", e.target.value)}
          >
            <option value="Português">Português</option>
            <option value="Inglês">Inglês</option>
            <option value="Japonês">Japonês</option>
          </select>

          <div className={classes.select_arrow}></div>
        </div>
        <label>País</label>
        <div className={classes.customselect}>
          <select
            name="user_pais"
            value={data.user_pais}
            onChange={(e) => updateFieldHandler("user_pais", e.target.value)}
          >
            <option value="Brasil">Brasil</option>
            <option value="Estados Unidos">Estados Unidos</option>
            <option value="Japão">Japão</option>
          </select>
          <div className={classes.select_arrow}></div>
        </div>
      </div>
    </div>
  );
};

export default Games;
