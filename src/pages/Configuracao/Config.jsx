import classes from "./Config.module.css";
import {
  FaAddressCard,
  FaLock,
  FaShieldAlt,
  FaQuestionCircle,
  FaHeartBroken,
  FaChevronRight,
  FaCopyright,
} from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";
import {useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";

const Config = () => {

  const navigate = useNavigate();
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () =>{
      try{
      const token = Cookies.get("token");
      const response = await axios.get("http://127.0.0.1:8000/api/users/perfil", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        })

        setData(response.data)

      }catch(error){
        console.log(error)
      }
    }
    fetchData()
  }, [])

  
  const handleDelete = async () => {
    const token = Cookies.get("token");

    
    Swal.fire({
      title: 'Tem certeza que deseja deletar sua conta?',
      text: "Você não poderá reverter essa ação!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FF0000',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        try{
         const response = axios.delete("http://127.0.0.1:8000/api/users/deletar", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });


          setTimeout(() => {
            Cookies.remove("token");
            navigate('/')
          }, 2000);

          const toast = Swal.mixin({
            timer: 2000
          })

          toast.fire(
            'Deletado!',
            'Sua conta foi deletada.',
            'success'
          )


        }catch(error){
          Swal.fire(
            'Erro!',
            'Não foi possível deletar sua conta.',
            'error'
          )
          console.log(error)
        }
      }
    })
  }

  return (
    <>
      <div className={classes.mainContainer}>
       {data ? (
        <>
        <NavBar user={data}/>
        <div className={classes.foto}>
          <img src={`http://127.0.0.1:8000/${data.user_image}`} />
        </div>
        <div className={classes.buttoncontainer}>
          <button onClick={() => navigate('/info') } class="infos">
            <FaAddressCard /> Informações da conta <FaChevronRight />
          </button>
          <button onClick={() => navigate('/alterarSenha') } class="seguranca">
            <FaLock /> Segurança <FaChevronRight />
          </button>
          <button onClick={() => navigate('/redes_sociais') } class="privacidade">
            <IoShareSocial  /> Social Media <FaChevronRight />
          </button>
          <button class="central">
            <FaQuestionCircle />
            Central de Ajuda <FaChevronRight />
          </button>
          <button onClick={handleDelete} class="deletar">
            <FaHeartBroken /> Deletar Conta <FaChevronRight />
          </button>
        </div>
        <Footer/>
        </>
       ) : (
        <Loading />
       )}
      </div>
    </>
  );
};

export default Config;
