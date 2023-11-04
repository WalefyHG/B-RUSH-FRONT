import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import classes from "./Teste.module.css";
const Teste = () => {
  // React Hook Forms

  return (
    <div className={classes.mainContainer}>
      <NavBar />
       <form>
        <div className={classes.card}>
            <div class={classes.btn}>
            <input type="submit" className={classes.cei} value="Criar/Editar Informações Time"/><br/>
            <input type="submit" className={classes.cei} value="Adicionar Membros"/><br/>
            <input type="submit" className={classes.cei} value="Gerenciar Membros"/><br/>
            <input type="submit" className={classes.cei} id={classes.del} value="Deletar Time"/><br/>
            </div>
        </div>
    </form>
    <Footer />
    </div>
  );
};

export default Teste;
