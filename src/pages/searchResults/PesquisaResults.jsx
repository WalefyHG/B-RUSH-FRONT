import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from "js-cookie";
import classes from "./PesquisaResults.module.css"
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';

const PesquisaResults = () => {
  const { user_firstName } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchData = async () => {
        const token = Cookies.get("token");
        if(token){
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/users/pesquisar/${user_firstName}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setResults(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os resultados da pesquisa:', error);
        setLoading(false);
      }
    }
    };

    fetchData();
  }, [user_firstName]);

  useEffect(()=>{
    const fetchUser = async () => {
      const token = Cookies.get("token");
      if(token){
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/users/perfil`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            setUser(response.data);
      }catch(error){
        console.error('Erro ao buscar o usuario:', error);
      }
    }
  }
  fetchUser()
  }, [])

  return (
    <div className={classes.mainContainer}>
      {user && (<NavBar user={user} />)}
      <div className={classes.container}>
      <h1>Resultados da Pesquisa para: {user_firstName}</h1>
      {loading && <p className={classes.carregando}>Carregando...</p>}
      {!loading && (
        <ul>
          {results.map((result) => (
            <li key={result.user_id}>
            <a className={classes.manipulate} href={`/perfil/${result.user_name}`}>
              <div className={classes.imageDiv}>
                <img src={`http://127.0.0.1:8000${result.user_image}`} alt="Imagem do Usuario" />
              </div>
            <div className={classes.textControl}>
            <label>Usuario: {result.user_firstName}</label>
            - 
            <label>Email: {result.user_email}</label>
            </div>
            </a> 
            </li>
            
          ))}
        </ul>
      )}
      </div>
      <Footer/>
    </div>
  );
};

export default PesquisaResults;