import classes from "./Info.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Info = () => {
  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState();
  const [existingData, setExistingData] = useState();
  const [reload, setReload] = useState(false)
  const navigate = useNavigate();


  const handleInputChange = (key, value) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
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
        setExistingData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [reload]);

  const handleEnd = () => {
    navigate("/perfil");
  };

  const handleReset = () => {
    setData(existingData);
  };

  const onSubmit = async () => {
    const formsData = new FormData();
    const dataImagem = data.image;
    const dataBanner = data.banner
    delete data.image;
    delete data.banner;
    formsData.append('user', JSON.stringify(data));
    formsData.append("image", dataImagem);
    formsData.append("banner", dataBanner)

    const token = Cookies.get("token");

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/users/atualizar/${existingData.user_id}`,
        formsData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          },
        }
      );
      setExistingData(response.data);
      if(response.status === 200){
        setReload(!reload)
      }

    } catch (error) {
      console.log(error);
    }
  };

  const formatBirthday = (perfil) => {
    const data = perfil;
    const dataFormatada = data.split('T')[0].split('-').reverse().join('/');
    return dataFormatada;
}

const userIdade = (perfil) => {
    const data = perfil;
    const dataFormatada = data.split('T')[0].split('-').reverse().join('/');
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const anoNascimento = dataFormatada.split('/')[2];
    const idade = anoAtual - anoNascimento;
    return idade;
}


  return (
    <div>
      {data ? (
        <div className={classes.mainContainer}>
          <NavBar />
          <div className={classes.containerGeral}>
            <div className={classes.firstContainer}>
              <div className={classes.pfpContainer}>
                <img className={classes.pfp} src={`http://127.0.0.1:8000${data.user_image}`} />
              </div>
              <div id={classes.nome}>
                <p>{data.user_name}</p>
              </div>
              <form id={classes.emailesenha}>
                <p className={classes.email}>Email:</p>
                <p>{data.user_email}</p>
                <p className={classes.data}>Data de Nascimento:</p>
                <p>{formatBirthday(data.user_birthday)}</p>
                <p className={classes.data}>Idade:</p>
                {data.user_birthday ? (
                  <p>{userIdade(data.user_birthday)}</p>
                ) : (
                  <p>Idade Nula</p>
                )}
              </form>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={classes.secondContainer}
            >
              <div className={classes.inputsconfig}>
                <label>Nome/Nick:</label>
                <input
                  type="text"
                  name="user_name"
                  value={data.user_name}
                  onChange={(e) =>
                    handleInputChange("user_name", e.target.value)
                  }
                />

                <label>Email</label>
                <input
                  type="text"
                  name="user_email"
                  value={data.user_email}
                  onChange={(e) =>
                    handleInputChange("user_email", e.target.value)
                  }
                />

                <label>Data de Nascimento</label>
                <input
                  type="date"
                  name="user_birthday"
                  value={data.user_birthday}
                  onChange={(e) =>
                    handleInputChange("user_birthday", e.target.value)
                  }
                />

                <label>Imagem</label>
                <input
                  type="file"
                  accept="image/*"
                  name="user_image"
                  onChange={(e) =>
                    handleInputChange("image", e.target.files[0])
                  }
                />

                <label>Banner</label>
                <input
                  type="file"
                  accept="image/*"
                  name="user_banner"
                  onChange={(e) =>
                    handleInputChange("banner", e.target.files[0])
                  }
                />

                <hr />

                <label>País</label>
                <div className={classes.customselect}>
                  <select
                    name="user_pais"
                    value={data.user_pais}
                    onChange={(e) =>
                      handleInputChange("user_pais", e.target.value)
                    }
                  >
                    <option value="Brasil">Brasil</option>
                    <option value="Estados Unidos">Estados Unidos</option>
                    <option value="Japão">Japão</option>
                  </select>
                  <div className={classes.select_arrow}></div>
                </div>

                <label>Idioma</label>
                <div className={classes.customselect}>
                  <select
                    name="user_idioma"
                    value={data.user_idioma}
                    onChange={(e) =>
                      handleInputChange("user_idioma", e.target.value)
                    }
                  >
                    <option value="Português">Português</option>
                    <option value="Inglês">Inglês</option>
                    <option value="Japonês">Japonês</option>
                  </select>
                  <div className={classes.select_arrow}></div>
                </div>

                <hr />

                <label>Jogos</label>
                <div className={classes.customselect}>
                  <select
                    name="user_games"
                    value={data.user_games}
                    onChange={(e) =>
                      handleInputChange("user_games", e.target.value)
                    }
                  >
                    <option value="CS:GO">CS:GO</option>
                    <option value="Valorant">Valorant</option>
                    <option value="League of Legends">League of Legends</option>
                  </select>
                  <div className={classes.select_arrow}></div>
                </div>
              </div>
              <div className={classes.botoes}>
                <button
                  type="button"
                  onClick={handleEnd}
                  className={classes.voltar}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className={classes.resetar}
                >
                  Resetar
                </button>
                <button type="submit" className={classes.salvar}>
                  Salvar
                </button>
              </div>
            </form>
          </div>
          <Footer />
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default Info;
