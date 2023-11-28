import { useState, useEffect, useRef } from "react";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import classes from "./Teste.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";

const Teste = () => {
  const [newsList, setNewsList] = useState([]);
  const [newNews, setNewNews] = useState({
    notice_title: "",
    notice_content: "",
    notice_date: getCurrentDate(),
  });
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const inputRef = useRef(null);

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
        const response = await axios.post(
          "http://127.0.0.1:8000/api/notices/notices",
          newNews,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newNews),
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
        )

        if(response.status === 200){
          setNewsList(newsList.filter(news => news.notice_id !== id))
        }else{
          console.error("Erro ao deletar noticia: ", response.statusText);
        }

      } catch (error) {
        console.error("Erro ao deletar noticia: ", error);
      }
    }
  }


  const handleUpdateNews = async () => {
    const token = Cookies.get("token");
    if (token && editingId) {
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/notices/update/${editingId}`,
          newNews,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        if(response.status === 200){
          const updatedNews = newsList.map((news) => news.notice_id === editingId ? response.data : news);
          setNewsList(updatedNews);

          setNewNews({
            notice_title: "",
            notice_content: "",
            notice_date: "",
          });
          setEditingId(null);

        }else{
          console.error("Erro ao atualizar noticia: ", response.statusText);
        }
      }catch(error){
        console.error("Erro ao atualizar noticia: ", error);
      }
  }
}

  const startNewsEditing = (news) => {
    setEditingId(news.notice_id);
    setNewNews({
      notice_title: news.notice_title,
      notice_content: news.notice_content,
      notice_date: news.notice_date,
    })

    if(inputRef.current){
      inputRef.current.scrollIntoView({
        behavior: "smooth"
      })
    }
  }

  const handleSearch = () =>{
    const results = newsList.filter(news =>
      news.notice_title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(results);
    setSearch("");
  }



  return (
    <div className={classes.mainContainer}>
      <NavBar />
      <div className={classes.card} ref={inputRef}>
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

        <input
          type="date"
          name="notice_date"
          value={newNews.notice_date}
          onChange={handleInputChange}
        />
        {editingId ? (
          <button onClick={handleUpdateNews}>Atualizando Noticia</button>
        ) : (
          <button onClick={handleCreateNews}>Criando Noticia</button>
        )}
        <div className={classes.search}>
          <input
            type="text"
            placeholder="Pesquisar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Pesquisar</button>
        </div>
      </div>
      <div className={classes.card2}>
        {searchResults.length > 0 ? (
          searchResults.map((news) => (
            <div className={classes.news} key={news.id}>
              <h1>{news.notice_title}</h1>
              <p>{news.notice_content}</p>
              <p>{news.notice_date}</p>
              <h2>Autor: {news.notice_writer.user_name}</h2>
              <img
                src={`http://127.0.0.1:8000${news.notice_writer.user_image}`}
              />
              <FaRegTrashAlt onClick={() => handleDeleteNews(news.notice_id)} />
            </div>
          ))
        ) : (
          newsList.map((news) => (
            <div className={classes.news} key={news.notice_id}>
              <h2>{news.notice_title}</h2>
              <p>{news.notice_content}</p>
              <p>{news.notice_date}</p>
              <h2>Autor: {news.notice_writer.user_name}</h2>
              <img
                src={`http://127.0.0.1:8000${news.notice_writer.user_image}`}
              />
              <div className={classes.edit}>
              <FaRegTrashAlt onClick={() => handleDeleteNews(news.notice_id)} />
              <FaPencilAlt id={classes.editando} onClick={() => startNewsEditing(news)} />
              </div>
            </div>
        ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Teste;
