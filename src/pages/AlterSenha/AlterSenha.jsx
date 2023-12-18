import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import classes from "./AlterSenha.module.css";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";

const AlterSenha = () => {

  const dados = {
    senha_atual: "",
    senha_nova: "",
    confirmar_senha: "",
  }

  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState();
  const [change_password, setPassword] = useState(dados)
  const navigate = useNavigate();
  const handleInputChange = (key, value) => {
    setPassword((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const Toast = Swal.mixin({
    toast: true,
    background: "#555",
    color: "#fff",
    position: "top-end",
    showConfirmButton: false,
    showCloseButton: true,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  })

  const handleEnd = () => {
    navigate("/perfil");
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/users/perfil",
          config
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async () => {
    const token = Cookies.get("token");

    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/users/atualizar_senha",
        change_password,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
       
      );
      if(response.status === 200){
        Toast.fire({
          icon: "success",
          title: "Senha alterada com sucesso!",
        })
        setTimeout(() => {
          Cookies.remove("token");
          navigate("/");
        }, 3000);
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.mainContainer}>
      {data ? (
        <>
          <NavBar user={data} />
          <div className={classes.foto}>
            <img src={`http://127.0.0.1:8000${data.user_image}`} />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={classes.buttonContainer}
          >
            <h2>Alterar Senha: </h2>
            <label>Senha Atual: </label>
            <input
              type="password"
              name="senha_atual"
              onChange={(e) => handleInputChange("senha_atual", e.target.value)}
              className={classes.input}
            />
            <label>Nova Senha: </label>
            <input
              type="password"
              name="senha_nova"
              onChange={(e) => handleInputChange("senha_nova", e.target.value)}
              className={classes.input}
            />
            <label>Confirmar Senha: </label>
            <input
              type="password"
              name="confirmar_senha"
              onChange={(e) =>
                handleInputChange("confirmar_senha", e.target.value)
              }
              className={classes.input}
            />
            <div className={classes.buttons}>
              <button type="submit" id={classes.enviar}>
                Enviar
              </button>
              <button type="button" onClick={handleEnd} id={classes.cancelar}>
                Cancelar
              </button>
            </div>
          </form>
          <Footer />
        </>
      ) : (
        <h1>Carregando...</h1>
      )}
    </div>
  );
};

export default AlterSenha;
