import classes from "./Loading.module.css";

const Loading = () => {

  return (
    <div className={classes.mainContainer}>
      <img src="/loading/loading_lol_transparent.gif" alt="" />
      <p className={classes.text}>Carregando...</p>
    </div>
  );
};

export default Loading;
