import classes from "./Info.module.css";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import  ButtonDatePicker  from "../../components/CustomDataPicker/CustomDataPicker";

const Info = () => {

  const [value, setValue] = useState(null);

  return (
    <div>
      <div className={classes.mainContainer}>
        <nav>
          <div className={classes.navContainer}>
            <div className={classes.search}>
              <img src="/Logo2.png" id="Logo-B-Rush" alt="Logo B-Rush" />
              <input type="text" placeholder="Pesquise Aqui" />
              <button type="submit">Search</button>
            </div>
            <div className={classes.links}>
              <ul className={classes.link}>
                <li>
                  <a href="#" id="h">
                    Games
                  </a>
                </li>
                <li>
                  <a href="#" id="s">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#" id="c">
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      src="/profile.png"
                      id={classes.profile}
                      alt="Icone de Perfil"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className={classes.foto}>
          <img src="/Perfil/fallen.jpg" />
        </div>
        <div className={classes.inputcontainer}>
          <label>Nome de Usuário: </label>
          <input type="text" id="nomeusuario" />
          <label>Email: </label>
          <input type="text" id="email" />
          <label>Telefone </label>
          <input type="tel" id="phone" />
          <label>País: </label>
          <select name="país" id="pais"></select>
          <label>Idioma: </label>
          <select name="idioma" id="idioma"></select>
          <label>Genero: </label>
          <select name="genero" id="genero">
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="outro">Outro</option>
          </select>
          <label>Data de Nascimento: </label>

      <ButtonDatePicker
        label={value == null ? null : value.format('MM/DD/YYYY')}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />

          <label>Jogo: </label>
          <select name="jogo" id="jogo">
            <option value="lol">League of Legends</option>
            <option value="csgo">Counter Strike: Global Offensive</option>
          </select>
          <div>
            <button id="cancelar">Cancelar</button>
            <button id="salvar">Salvar</button>
          </div>
        </div>
        <footer className={classes.footer}>
          <h2>&copy; Criado Pela B-Rush/2023</h2>
        </footer>
      </div>
    </div>
  );
};

export default Info;
