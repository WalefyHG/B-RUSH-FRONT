import { useState, useEffect, useRef } from "react";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import classes from "./Hub.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { FaRegTrashAlt, FaPencilAlt, FaImage } from "react-icons/fa";
import CustomDiv from "../../components/CustomDiv/CustomDiv";
import Swal from "sweetalert2";

const Hub = () => {
  const [newsList, setNewsList] = useState([]);
  const [newNews, setNewNews] = useState({
    notice_title: "",
    notice_content: "",
    notice_date: getCurrentDate(),
  });
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [image, setImage] = useState(null);
  const inputRef = useRef(null);
  const [user, setUser] = useState();

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

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/api/notices/allnotices",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setNewsList(response.data);
        } catch (error) {
          console.error("Erro ao encontrar as noticias: ", error);
        }
      }
    };

    const fetchUser = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/api/users/perfil",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          setUser(response.data);
        }catch(error){
          console.log("Erro ao encontrar o usuario: ", error);
        }
    }
  };

    fetchUser();
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setNewNews({
      ...newNews,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateNews = async () => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const formData = new FormData();
        formData.append("notice", JSON.stringify(newNews));
        formData.append("image", image);
        const response = await axios.post(
          "http://127.0.0.1:8000/api/notices/notices",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          const createNews = response.data;
          setNewsList([...newsList, createNews]);

          setNewNews({
            notice_title: "",
            notice_content: "",
            notice_date: getCurrentDate(),
          });

          // Limpar o campo de pesquisa
          setSearch("");
        } else {
          console.error("Erro ao criar noticia: ", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao criar noticia: ", error);
      }
    }
  };

  const handleDeleteNews = async (id) => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/notices/deletando/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setNewsList(newsList.filter((news) => news.notice_id !== id));
          Toast.fire({
            icon: "success",
            text: "Noticia deletada com sucesso",
          });
        } else {
          console.log("Erro ao deletar noticia: ", response.statusText);
        }
      } catch (error) {
        if (error.response.status === 401) {
          console.log("Erro 401: Sem permissão");
          Toast.fire({
            icon: "error",
            text: "Você não tem permissão para deletar",
          });
        }
        if (error.response.status === 404) {
          Toast.fire({
            icon: "error",
            text: "Noticia não encontrada",
          });
        }
      }
    }
  };

  const handleUpdateNews = async () => {
    const token = Cookies.get("token");
    if (token && editingId) {
      try {
        const formData = new FormData();
        formData.append("notice", JSON.stringify(newNews));
        if (image) {
          formData.append("image", image);
        }

        const response = await axios.put(
          `http://127.0.0.1:8000/api/notices/update/${editingId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          const updatedNews = newsList.map((news) =>
            news.notice_id === editingId ? response.data : news
          );
          setNewsList(updatedNews);

          setNewNews({
            notice_title: "",
            notice_content: "",
            notice_date: getCurrentDate(),
          });
          setEditingId(null);
        }
        if (response.status === 401) {
          Toast.fire({
            icon: "error",
            text: "Você não tem permissão para deletar",
          });
        } else {
          console.error("Erro ao deletar noticia: ", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao atualizar noticia: ", error);
      }
    }
  };

  const startNewsEditing = (news) => {
    setEditingId(news.notice_id);
    setNewNews({
      notice_title: news.notice_title,
      notice_content: news.notice_content,
      notice_date: getCurrentDate(),
    });

    if (inputRef.current) {
      inputRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const handleSearch = () => {
    const results = newsList.filter((news) =>
      news.notice_title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(results);
    setSearch("");
  };

  const handleClearSearch = () => {
    setSearchResults([]);
    setSearch("");
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const formatData = (data) => {
    const date = new Date(data);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className={classes.mainContainer}>
    {user && (<NavBar user={user} />)}
      <div className={classes.container}>
        <CustomDiv />
        <div className={classes.card} ref={inputRef}>
          <div className={classes.controlCreate}>
            <input
              type="text"
              placeholder="Titulo"
              name="notice_title"
              value={newNews.notice_title}
              onChange={handleInputChange}
            />

            <textarea
              name="notice_content"
              placeholder="Conteudo"
              value={newNews.notice_content}
              onChange={handleInputChange}
            />

            <label htmlFor="inputImage" className={classes.fileUpload}>
              <FaImage />
              Envie seu Arquivo
              <input
                type="file"
                accept="img/*"
                id="inputImage"
                name="image"
                onChange={handleImage}
              />
            </label>
          </div>

          {editingId ? (
            <button onClick={handleUpdateNews}>Atualizando Noticia</button>
          ) : (
            <button onClick={handleCreateNews}>Criando Noticia</button>
          )}
          <hr />
          <div className={classes.card2}>
            {newsList.map((news) => (
              <div className={classes.news} key={news.notice_id}>
                <h2>{news.notice_title}</h2>
                <p>{news.notice_content}</p>
                <p>{formatData(news.notice_date)}</p>
                <h2>Autor: {news.notice_writer.user_name}</h2>
                <img src={`http://127.0.0.1:8000${news.notice_image}`} />
                {user && user.user_id === news.notice_writer.user_id && (
                <div className={classes.edit}>
                  <FaRegTrashAlt
                    onClick={() => handleDeleteNews(news.notice_id)}
                  />
                  <FaPencilAlt
                    id={classes.editando}
                    onClick={() => startNewsEditing(news)}
                  />
                </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className={classes.search}>
          <div className={classes.controlSearch}>
            <input
              type="text"
              placeholder="Pesquisar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleSearch}>Pesquisar</button>
            {search && (
              <span onClick={handleClearSearch} className={classes.clearIcon}>
                &#x2715;
              </span>
            )}
          </div>
          {searchResults.map((news) => (
            <div className={classes.news2} key={news.id}>
              <h1>{news.notice_title}</h1>
              <p>{news.notice_content}</p>
              <p>{formatData(news.notice_date)}</p>
              <h2>Autor: {news.notice_writer.user_name}</h2>
              <img src={`http://127.0.0.1:8000${news.notice_image}`} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Hub;
