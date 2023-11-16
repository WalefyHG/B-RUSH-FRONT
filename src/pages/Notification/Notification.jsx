import classes from "./Notification.module.css";
import { useState } from "react";
import { OtpInput } from "reactjs-otp-input";

const Notification = () => {

    const [otp, setOtp] = useState("");

    const handleChange = (opt) => {
        setOtp({otp})
        console.log(otp)
  };

  return (
    <>
      <div className={classes.mainContainer}>
        <div className={classes.container}>
          <div className={classes.imagemDiv}>
            <img src="/FaviconLight.png" alt="" />
          </div>
          <div className={classes.temp}>
            <img src="/tempo-restante2.png" alt="" />
            <h3>00:30s</h3>
          </div>

          <div className={classes.otpDiv}>
            <h1>Insira o código de verificação</h1>
            <OtpInput
              containerStyle={classes.otpInput}
              value={otp}
              onChange={handleChange}
              inputStyle={classes.inputs}
              numInputs={6}
            />
            <p>
              Não recebeu o código? <a>Reenviar</a>
            </p>
            <button>Enviar</button>
          </div>
          <div className={classes.login}>
            <p>
              Já tem uma conta? <a>Entre para Logar</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
