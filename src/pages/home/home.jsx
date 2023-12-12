import classes from "./Home.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const Toast = Swal.mixin({
    toast: true,
    background: "#555",
    color: "#fff",
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const onSubmit = async (data) => {
    const formsData = {
      user_email: data.user_email,
      user_password: data.user_password,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/users/login",
        formsData
      );


      if (response.status === 200) {
        const token = response.data.token;
        Cookies.set("token", token);

        if (response.data.response.mensagem === "Código de verificação enviado") {
          navigate("/notification");
        } else {
          setLoggedIn(true);
          navigate("/perfil");
        }
        reset();
      }


    } catch (error) {
      if (error.response.status === 400) {
        Toast.fire({
          icon: "error",
          title: "Email ou senha incorretos",
        })
      }
      if(error.response.status === 404){
        Toast.fire({
          icon: "error",
          title: "Usuario não encontrado",
        })
      }
      
      if(error.response.status === 500){
        Toast.fire({
          icon: "error",
          title: "Erro interno do servidor",
        })
      }
      
    }
  };
  return (
    <>
      <div className={classes.mainContainer}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.forms}>
          <img src="/FaviconLight.png" alt="B-Rush" id={classes.icon} />
          <input
            type="text"
            name="user_email"
            {...register("user_email", { required: true })}
            className={classes.inputText}
            placeholder="Email"
          />
          {errors.username && <p>{errors.username.message}</p>}
          <br />
          <input
            type="password"
            name="user_password"
            {...register("user_password", { required: true })}
            className={classes.inputText}
            placeholder="Senha"
          />
          {errors.password && <p>{errors.password.message}</p>}
          <br />
          <div className={classes.sideButtons}>
            <button className={classes.button}>Entrar</button>
            <a
              href="/cadastro"
              className={classes.button}
              id={classes.cancelar}
            >
              Cadastrar
            </a>
          </div>
          <div className={classes.select}>
            <input type="checkbox" name="lembrar" id={classes.lembrar} />
            <label htmlFor="lembrar">Lembrar-me</label>
          </div>
          <div className={classes.select}>
            <p id={classes.esqueceu}>
              Esqueceu sua senha?{" "}
              <a href="#">Clique aqui para recuperar senha</a>
            </p>
          </div>
        </form>
        {loggedIn && <Navigate to="/perfil" />}
      </div>
    </>
  );
};

export default home;
