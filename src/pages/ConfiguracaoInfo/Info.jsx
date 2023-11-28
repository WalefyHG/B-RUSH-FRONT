import classes from "./Info.module.css";
import { useState } from "react";
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';

const Info = () => {

  return (
    <div>
      <div className={classes.mainContainer}>
      <NavBar />
    <div class={classes.containerGeral}>
        <div class={classes.firstContainer}>
            <div class={classes.pfpContainer}>
                <img class={classes.pfp} src="/Perfil/fallen.jpg"/>
            </div>
            <div id={classes.nome}>
                <p> Fallen</p>
            </div>
            <form id={classes.emailesenha}>
                <p class={classes.email}>Email:</p>
                <p>Fallen@.com</p>
                <p class={classes.data}>Data de Nascimento:</p>
                <p>20/20/20</p>
            </form>
        </div>
        <div class={classes.secondContainer}>
            <div class={classes.inputsconfig}>
                <label>Nome/Nick:</label>
                <input type="text" name="Nome"/>

                <label>Email</label>
                <input type="text" name="Email"/>

                <label>Genero</label>
                <div class={classes.customselect}>
                    <select name="Genero">
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Outro">Outro</option>
                    </select>
                    <div class={classes.select_arrow}>
                    </div>
                </div>

                <label>Data de Nascimento</label>
                <input type="date" name="Data de Nascimento"/>

                <hr/>

                <label>Telefone</label>
                <input type="tel" name="Telefone"/>

                <label>País</label>
                <div class={classes.customselect}>
                    <select name="País">
                        <option value="Brasil">Brasil</option>
                        <option value="Estados Unidos">Estados Unidos</option>
                        <option value="Japão">Japão</option>
                    </select>
                    <div class={classes.select_arrow}>
                    </div>
                </div>

                <label>Idioma</label>
                <div class={classes.customselect}>
                    <select name="Idioma">
                        <option value="Português">Português</option>
                        <option value="Inglês">Inglês</option>
                        <option value="Japonês">Japonês</option>
                    </select>
                    <div class={classes.select_arrow}>
                    </div>
                </div>

                <hr/>

                <label>Jogos</label>
                <div class={classes.customselect}>
                    <select name="Jogos">
                        <option value="CS:GO">CS:GO</option>
                        <option value="Valorant">Valorant</option>
                        <option value="League of Legends">League of Legends</option>
                    </select>
                    <div class={classes.select_arrow}>
                    </div>
                </div>
            </div>
            <div class={classes.botoes}>
                <button onclick="Voltar()" class={classes.voltar}>Cancelar</button>
                <button onclick="Salvar()" class={classes.salvar}>Salvar</button>
            </div>
        </div>
    </div>
    <Footer />
    </div>
    </div>
  );
};

export default Info;
