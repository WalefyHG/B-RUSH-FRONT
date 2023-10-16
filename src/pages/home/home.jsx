import classes from './Home.module.css'

const home = () => {
  return (
    <>
    <div className={classes.main}>
      <div className={classes.container}>
        <img id={classes.profiles} src="/profile.png" alt="Profile"/>
        <input className={classes.button} type="email" id="email" name="email" placeholder="Email" required />
        <input className={classes.button} type="password" id="senha" name="senha" placeholder="Senha" required/>


        <div className={classes.botoes}>
            <div className={classes.check}>
                <div className={classes.lembrarMe}>
                    <input className={classes.button} type="checkbox" id="lembrar" name="lembrar" /><pre className={classes.lembrar}>Lembrar-me</pre> 
                </div>
                <span>Esqueceu sua senha? <a href="#">Clique aqui</a></span>
            </div>
            <input type="submit" value="Enviar" id={classes.btn2}/>
        </div>

        <span id="cadast">Já é cadastrado? Se não. <a href="./cadastro.html">Realize seu cadastro</a></span>

      </div>
      </div>
    </>
  )
}

export default home
