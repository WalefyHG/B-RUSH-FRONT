import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import classes from './RedesSociais.module.css'
import NavBar from "../../components/NavBar/NavBar";
import Loading from "../../components/Loading/Loading";
import Swal from "sweetalert2";

const RedesSociais = () => {
  const dados = {
    user_instagram: "",
    user_twitter: "",
    user_twitch: "",
    user_youtube: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [social, setSocial] = useState(dados);
  const navigate = useNavigate();
  const [data, setData] = useState();
  const Toast = Swal.mixin({
    background: "#555",
    color: "#fff",
    width: 300,
    toast: true,
    font: "Montserrat",
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  })


  const handleInputChange = (key, value) => {
    setSocial((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/users/perfil", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setData(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    const token = Cookies.get("token");
    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/users/atualizar_redes_sociais",
        social,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Toast.fire({
        icon: "success",
        title: "Dados atualizados com sucesso!",
      });
      setTimeout(() => {
        navigate("/perfil");
      }, 3000);
      console.log(response.data);
    } catch (error) {
      Toast.fire({
        icon: "success",
        title: "Dados atualizados com sucesso!",
      });
    }
  };
  
  if(!data){
    return <Loading />
  }

  return (
    <>
    
      <div className={classes.mainContainer}>
      {data && (<NavBar user={data} />)}
      <div className={classes.imgContainer}>
        <img src={`http://127.0.0.1:8000/${data.user_image}`} alt="" />
      </div>
      <form onSubmit={handleSubmit(handleSave)} className={classes.container}>
        <label>Instagram:</label>
        <input
          type="text"
          name="user_instagram"
          onChange={(e) => handleInputChange("user_instagram", e.target.value)}
        />

        <label>Twitter:</label>
        <input
          type="text"
          name="user_twitter"
          onChange={(e) => handleInputChange("user_twitter", e.target.value)}
        />

        <label>Twitch:</label>
        <input
          type="text"
          name="user_twitch"
          onChange={(e) => handleInputChange("user_twitch", e.target.value)}
        />

        <label>Youtube:</label>
        <input
          type="text"
          name="user_youtube"
          onChange={(e) => handleInputChange("user_youtube", e.target.value)}
        />

        <button type="submit">Salvar</button>
      </form>
    </div>
    </>
  );
};

export default RedesSociais;
