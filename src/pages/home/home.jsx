import classes from './Home.module.css'

const home = () => {
  return (
    <>
      <div className={classes.mainContainer}>
        <form className={classes.forms}>
          <img src="/FaviconLight.png" alt="B-Rush" id={classes.icon} />
          <input type="text" name='email' className={classes.inputText} placeholder='Email'/>
          <input type="password" name='password' className={classes.inputText} placeholder='Senha'/>
          <div className={classes.sideButtons}>
            <button className={classes.button}>Entrar</button>
            <button className={classes.button} id={classes.cancelar}>Cadastrar</button>
          </div>
          <div className={classes.select}>
            <input type="checkbox" name="lembrar" id={classes.lembrar}/>
            <label htmlFor="lembrar">Lembrar-me</label>
          </div>
          <div className={classes.select}>
            <p id={classes.esqueceu}>Esqueceu sua senha? <a href='#'>Clique aqui para recuperar senha</a></p>
            </div>
        </form>
      </div>
    </>
  )
}

export default home
