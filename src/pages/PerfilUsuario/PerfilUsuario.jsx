import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  FaEnvelope,
  FaUserCircle,
  FaKeyboard,
  FaTrophy,
  FaVideo,
  FaArrowCircleRight,
} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import classes from "./PerfilUsuario.module.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from '../../components/Footer/Footer';
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const Perfil = () => {
  const [perfilData, setPerfilData] = useState(undefined);
  const {user_name} = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/users/perfil/${user_name}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data)
          setPerfilData(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, []);


  if(!perfilData){
    return (
        <Loading/>
    )
  }

  return (
    <div className={classes.mainContainer}>
      <NavBar />
        <main className={classes.main}>
          <section>
            <div className={classes.bannerContainer}>
              <div className={classes.imgbanner}>
                <img src={"/Perfil/banner2.png"} className={classes.bannerimg} />
              </div>
              <div className={classes.profileImage}>
                <img
                  src={
                   `http://127.0.0.1:8000${perfilData.user_image} `
                  }
                  id={classes.profile2}
                  alt="Icone de Perfil"
                />
                <a href="#" className={classes.iconCsgo}>
                  <img
                    src="/4737387_counter strike_cs_csgo_games_gaming_icon.svg"
                    alt="Counter-Strike icon"
                  />
                </a>
                <div className={classes.card}>
                  <h1>{perfilData.user_name}</h1>
                  <h2>
                    <img
                      src="/Perfil/logo.png"
                      className={classes.imm}
                      alt="Logo"
                    />{" "}
                    Imperial Sports
                  </h2>
                </div>
              </div>
              <div className={classes.socialMedias}>
                <ul>
                  <li>
                    <a href="#">
                      <img src="/logos/instagram.png" alt="Instagram" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="/logos/twitter.png" alt="Twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="/logos/twitch.png" alt="Twitch" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="/logos/youtube.png" alt="Youtube" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <section className={classes.sidebar}>
            <div className={classes.sidebarContainer}>
              <ul>
                <h2 id="h2">Navegue pelo perfil</h2>
                <li>
                  <a href="#">
                    <FaEnvelope />
                    <span>Cartão de Visita</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FaUserCircle />
                    <span>Informações do Perfil</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FaKeyboard />
                    <span id="peri">Perifericos</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FaTrophy />
                    <span>Hist. Competitivo</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FaVideo />
                    <span>Vídeos ou Clipes</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FaGear />
                    <span>Configurações</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className={classes.btn}>
              <button id={classes.toggleSidebar}>
                <FaArrowCircleRight />
              </button>
            </div>
            <div className={classes.infoPlayerContainer}>
              <div className={classes.profilePicture}>
                <img
                  src="/Perfil/fallen.jpg"
                  alt="Banner"
                  id={classes.fallen}
                />
              </div>
              <div  className={classes.text}>
                <h2>{perfilData.user_name}</h2>
                <h2>Game: Counter-Strike : GO</h2>
                <h2>Equipe: Imperial Esports</h2>
                <h2>Posição: Leader/AWPer</h2>
                <h2>Idade: 31</h2>
                <h2>Status: Ativo</h2>
              </div>
            </div>
          </section>
        </main>
      <Footer/>
    </div>
  );
};

export default Perfil;
