import classes from "./Upload.module.css";
import { useState } from "react";

const Upload = ({ data, updateFieldHandler }) => {



  return (
    <div className={`${classes.formControl}`}>
      <label htmlFor="">Email</label>
      <input
        type="text"
        name="user_email"
        value={data.user_email || ""}
        onChange={(e) => updateFieldHandler("user_email", e.target.value)}
        placeholder="Digite seu email"
      />
      <label htmlFor="">Confirme Email</label>
      <input type="text" name="confirm_email" placeholder="Confirme seu email" id="" />
      <label htmlFor="">Imagem de Perfil</label>
      <input
        type="file"
        name="user_image"
        accept="image/*"
        onChange={(e) => updateFieldHandler("image", e.target.files[0])}
      />
    </div>
  );
};

export default Upload;
