import classes from './Config.module.css'
import { FaAddressCard, FaLock, FaShieldAlt, FaQuestionCircle, FaHeartBroken, FaChevronRight, FaCopyright } from 'react-icons/fa'


const Config = () => {
  return (
    <>
        <div className={classes.mainContainer}>
        <nav>
            <div className={classes.navContainer}>
                <div className={classes.search}>
                    <img src="/Logo2.png" id="Logo-B-Rush" alt="Logo B-Rush" />
                    <input type="text" placeholder="Pesquise Aqui" />
                    <button type="submit">Search</button>
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
        <div className={classes.foto}>
            <img src="/Perfil/fallen.jpg" />
        </div>
        <div className={classes.buttoncontainer}>
            <button class="infos"><FaAddressCard /> Informações da conta <FaChevronRight /></button>
            <button class="seguranca"><FaLock /> Segurança <FaChevronRight /></button>
            <button class="privacidade"><FaShieldAlt /> Privacidade <FaChevronRight /></button>
            <button class="central"><FaQuestionCircle />Central de Ajuda <FaChevronRight /></button>
            <button class="deletar"><FaHeartBroken /> Deletar Conta <FaChevronRight /></button>
        </div>
    <footer className={classes.footer}>
        <h2> {<FaCopyright />} Criado Pela B-Rush/2023</h2>
    </footer>
    </div>
    </>
  )
}

export default Config
