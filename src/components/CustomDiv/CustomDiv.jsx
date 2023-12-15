import {useState, useEffect} from "react";
import axios from 'axios';
import Cookies from "js-cookie";
import classes from "./CustomDiv.module.css";
import Loading from "../Loading/Loading";
const CustomDiv = () => {

    const [data, setData] = useState();
    
    useEffect(() =>{
        const token = Cookies.get('token');
        const fetchData = async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/users/perfil', {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            setData(response.data);
        }
        fetchData();
    }, [])

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

    if(!data){
        return <Loading />
    }

  return (
    <div className={classes.firstContainer}>
      <div className={classes.pfpContainer}>
        <img
          className={classes.pfp}
          src={`http://127.0.0.1:8000${data.user_image}`}
        />
      </div>
      <div id={classes.nome}>
        <h2>{data.user_name}</h2>
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
  );
};

export default CustomDiv;
