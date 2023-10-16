import React from 'react'
import classes from './Cadastro.module.css'

const Cadastro = () => {
  return (
    <>
      <div className={classes.mainContainer}>
          <div className={classes.contain}>
            <div className={classes.formulario}>
            <label>Nome:</label>
            <input type="text" name="nome" id="nome" className={classes.inputs} required /><br /><br />

            <label>Email:</label>
            <input type="email" name="email" id="email" className={classes.inputs} required /><br /><br />

            <label>Data de Nascimento:</label>
            <input type="date" name="data" id="data" className={classes.inputs} required /><br /><br />

            <label>Senha:</label>
            <input type="password" name="senha" id="password" className={classes.inputs} required /><br /><br />

            <label>Confirmar senha:</label>
            <input type="password" name="senha2" id="confirm_password" className={classes.inputs} required />
            
            <div className={classes.checkbox}>
                <input type="file" name="imagem" accept=".png, .jpg, .jpeg" id="" />
            </div>
            <div className={classes.button}>
            <input type="submit" className={classes.btn} value="Criar Conta" />
            
            </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default Cadastro
