import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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

  const handleInputChange = (key, value) => {
    setSocial((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

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
      setTimeout(() => {
        navigate("/perfil");
      }, 3000);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleSave)}>
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
  );
};

export default RedesSociais;
