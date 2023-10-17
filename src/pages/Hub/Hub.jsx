import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import classes from "./Hub.module.css";

const Hub = () => {
  return (
    <div className={classes.mainContainer}>
      <NavBar />
      <div className={classes.foto}>
        <img src="/Perfil/fallen.jpg" />
      </div>
      <div className={classes.buttonContainer}>
        <h2>Alterar Senha: </h2>
        <label>Senha Atual: </label>
        <input type="password" className={classes.input} />
        <label>Nova Senha: </label>
        <input type="password" className={classes.input} />
        <label>Confirmar Senha: </label>
        <input type="password" className={classes.input} />
        <div className={classes.buttons}>
          <input type="submit" value="Enviar" id={classes.enviar}/>
          <input type="submit"value="Cancelar" id={classes.cancelar} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Hub;
