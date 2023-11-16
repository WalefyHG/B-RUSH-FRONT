import classes from "./NavBar.module.css";
import Cookies from "js-cookie";
import { useNavigate  } from 'react-router-dom';
import { useState } from "react";
const NavBar = () => {
  const [user_firstName, setUserFirstName] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpe os cookies e tokens
    Cookies.remove("token");

    // Redirecione o usuário para a página de login (ou qualquer outra página desejada)
    navigate("/");
  };

  const handleSearch = () => {
    navigate(`/pesquisar/${user_firstName}`);
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
                <a href="#" id="h">
                  Games
                </a>
              </li>
              <li>
                <a href="#" id="s">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#" id="c">
                  Contato
                </a>
              </li>
              <li>
                <a onClick={handleLogout}>
                  <img
                    src="/profile.png"
                    id={classes.profile}
                    alt="Icone de Perfil"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
