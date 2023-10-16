import React from 'react'
import {FaEnvelope, FaUserCircle, FaKeyboard, FaTrophy, FaVideo, FaArrowCircleRight} from 'react-icons/fa'
import {FaGear} from 'react-icons/fa6'
import classes from './Perfil.module.css'


const Perfil = () => {
  return (
    <div className={classes.mainContainer}>
    <nav>
        <div className={classes.navContainer}>
            <div className={classes.search}>
                <img src="/Logo2.png" id={classes.logoBrush} alt="Logo B-Rush" />
                <input type="text" id={classes.texto} placeholder="Pesquise Aqui" />
                <button type="submit" id={classes.pesquisa}>Search</button>
            </div>
            <div className={classes.links}>
                <ul className={classes.link}>
                    <li><a href="#" id="h">Games</a></li>
                    <li><a href="#" id="s">Sobre</a></li>
                    <li><a href="#" id="c">Contato</a></li>
                    <li><a href="#"><img src="/profile.png" id={classes.profile} alt="Icone de Perfil" /></a></li>
                </ul>
            </div>
        </div>
    </nav>
    <main className={classes.main}>
        <section>
            <div className={classes.bannerContainer}>
                <div className={classes.imgbanner}>
                    <img src="/Perfil/banner2.png" className={classes.bannerimg} />
                </div>
                <div className={classes.profileImage}>
                    <img src="/Perfil/fallen.jpg" id={classes.profile2} alt="Icone de Perfil" />
                        <a href="#" id={classes.iconCsgo}><img id={classes.iconCsgo} src="/4737387_counter strike_cs_csgo_games_gaming_icon.svg" alt="Counter-Strike icon" /></a>
                    <div className={classes.card}>
                        <h1>Fallen</h1>
                        <h2><img src="/Perfil/logo.png" className={classes.imm} alt="Logo" /> Imperial Sports</h2>
                    </div>
                </div>
                <div className={classes.socialMedias}>
                    <ul>
                        <li><a href="#"><img src="/logos/instagram.png" alt="Instagram" /></a></li>
                        <li><a href="#"><img src="/logos/twitter.png" alt="Twitter" /></a></li>
                        <li><a href="#"><img src="/logos/twitch.png" alt="Twitch" /></a></li>
                        <li><a href="#"><img src="/logos/youtube.png" alt="Youtube" /></a></li>
                    </ul>
                </div>
            </div>
        </section>
        <section className={classes.sidebar}>
            <div className={classes.sidebarContainer}>
                <ul>
                    <h2 id="h2">Navegue pelo perfil</h2>
                    <li><a href="#"><FaEnvelope /><span>Cartão de Visita</span></a></li>
                    <li><a href="#"><FaUserCircle /><span>Informações do Perfil</span></a></li>
                    <li><a href="#"><FaKeyboard /><span id="peri">Perifericos</span></a></li>
                    <li><a href="#"><FaTrophy/><span>Hist. Competitivo</span></a></li>
                    <li><a href="#"><FaVideo/><span>Vídeos ou Clipes</span></a></li>
                    <li><a href="#"><FaGear /><span>Configurações</span></a></li>
                </ul>
            </div>
            <div className={classes.btn}>
                <button id={classes.toggleSidebar}><FaArrowCircleRight/></button>
            </div>
            <div className={classes.infoPlayerContainer}>
                <div className={classes.profilePicture}>
                    <img src="/Perfil/fallen.jpg" alt="Banner" id={classes.fallen}/>
                </div>
                <form action="get" className={classes.text}>
                    <h2>Nacionalidade: Brasileiro</h2>
                    <h2>Game: Counter-Strike : GO</h2>
                    <h2>Equipe: Imperial Esports</h2>
                    <h2>Posição: Leader/AWPer</h2>
                    <h2>Idade: 31</h2>
                    <h2>Status: Ativo</h2>
                </form>
            </div>
        </section>
    </main>
    <footer className={classes.footerContainer}>
            <h2>&copy; Criado Pela B-Rush/2023</h2>
    </footer>
</div>

  )
}

export default Perfil
