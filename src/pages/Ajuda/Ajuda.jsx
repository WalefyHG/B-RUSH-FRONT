import classes from "./Ajuda.module.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

const Ajuda = () => {
  return (
    <div className={classes.mainContainer}>
    <NavBar />
    <div className={classes.foto}>
      <img src="/Perfil/fallen.jpg" />
    </div>
    <form class={classes.card}>
      <label for="user">Nome de Usúario:</label>
      <br />
      <h2>Loiradotchan</h2>
      <br />
      <label for="email">Email:</label>
      <br />
      <h2>bigwin@gmail.com</h2>
      <br />

      <label for="message">Digite aqui sua mensagem:</label>
      <br />
      <div class={classes.cube}>
        <textarea name="message" rows="11" cols="30"></textarea>
      </div>
      <div class={classes.btn}>
        <input type="submit" id={classes.cnl} value="Cancelar" />
        <input type="submit" id={classes.env} value="Enviar" />
      </div>
    </form>
    <Footer />
  </div>
  )
}

export default Ajuda
