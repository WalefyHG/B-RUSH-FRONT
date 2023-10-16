import classes from "./NavBar.module.css";
const NavBar = () => {
  return (
    <div>
      <nav>
        <div className={classes.navContainer}>
          <div className={classes.search}>
            <img src="/Logo2.png" id={classes.logoBrush} alt="Logo B-Rush" />
            <input type="text" id={classes.texto} placeholder="Pesquise Aqui" />
            <button type="submit" id={classes.pesquisa}>
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
                <a href="#">
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
