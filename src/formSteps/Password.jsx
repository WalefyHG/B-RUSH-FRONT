
import classes from "./Upload.module.css";

const Password = ({ data, updateFieldHandler }) => {



  return (
    <div className={`${classes.formControl}`}>
      <label htmlFor="">Senha</label>
      <input
        type="password"
        name="user_password"
        value={data.user_password || ""}
        onChange={(e) => updateFieldHandler("user_password", e.target.value)}
        placeholder="Digite sua senha"
      />
      <label htmlFor="">Confirme sua Senha</label>
      <input type="password" name="confirm_password" placeholder="Confirme sua senha"  />
    </div>
  );
};

export default Password;
