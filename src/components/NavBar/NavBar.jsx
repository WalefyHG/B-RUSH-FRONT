import classes from "./NavBar.module.css";
import Cookies from "js-cookie";
import { useNavigate, useParams  } from 'react-router-dom';
import { useState } from "react";
import { FaDoorOpen, FaRegNewspaper } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";

const NavBar = ({ user }) => {
  const [user_firstName, setUserFirstName] = useState('');
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleLogout = () => {
    // Limpe os cookies e tokens
    Cookies.remove("token");

    // Redirecione o usuário para a página de login (ou qualquer outra página desejada)
    navigate("/");
  };

  const handleSearch = () => {
    navigate(`/pesquisar/${user_firstName}`);
  }

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  

  return (
    <div>
      <nav>
        <div className={classes.navContainer}>
          <div className={classes.search}>
            <img src="/FaviconLight.png" id={classes.logoBrush} alt="Logo B-Rush" />
            <input type="text" id={classes.texto} value={user_firstName} name="user_firstName" onChange={(e) => setUserFirstName(e.target.value)} placeholder="Pesquise Aqui" />
            <button type="submit" onClick={handleSearch} id={classes.pesquisa}>
              Search
            </button>
          </div>
          <div className={classes.links}>
            <ul className={classes.link}>
              <li>
                <a onClick={handleModal}>
                  <img
                    src={`http://127.0.0.1:8000/${user.user_image}`}
                    id={classes.profile}
                    alt="Icone de Perfil"
                  />
                  <p>{user.user_firstName}</p>
                </a>
                {isModalOpen && (
                  <div className={classes.modal}>
                    {/* Adicione o conteúdo do seu modal aqui */}
                    <div className={classes.conteudo}>
                      <button onClick={() => navigate('/perfil')}><IoPersonCircle/> Perfil</button>
                      <button onClick={() => navigate('/hub')}><FaRegNewspaper/> Hub</button>
                      <button id={classes.logout} onClick={handleLogout}><FaDoorOpen/> Logout</button>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
