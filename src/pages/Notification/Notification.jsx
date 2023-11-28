import classes from "./Notification.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OtpInput } from "reactjs-otp-input";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import axios from 'axios';

const Notification = () => {
  const [otp, setOtp] = useState("");
  const [isValidCode, setIsValidCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(600);

  const Navigate = useNavigate();
  const Toast = Swal.mixin({
    background: "#555",
    color: "#fff",
    width: 300,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => prev - 1);
      if(countdown === 0){
        Navigate('/');
        Cookies.remove('token');
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [countdown, Navigate]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const displaySeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${displayMinutes}:${displaySeconds}`;
  };

  const handleChange = (otp) => {
    setOtp(otp);
    setIsValidCode(otp.length === 6);
  };


  const isClicked = async () => {
    const token = Cookies.get("token");
      await axios.post('http://127.0.0.1:8000/api/users/enviar_codigo', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      Toast.fire({
        icon: "success",
        title: "Código enviado com sucesso!",
      });
  };


  const verifyCode = async () => {
    const token = Cookies.get("token");
    
    try {
      setIsLoading(true);
      const response = await axios.post(
        `http://127.0.0.1:8000/api/users/verificar_codigo/${otp}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        if(response.data.mensagem === "Código verificado com sucesso"){
          Navigate('/perfil');
        }else{
          Toast.fire({
            icon: "error",
            title: "Código inválido!",
          });
        }
  }catch(error){
    console.error("Erro ao enviar formulario: ", error);
  }finally{
    setIsLoading(false);
  }
}

  return (
    <>
      <div className={classes.mainContainer}>
        <div className={classes.container}>
          <div className={classes.imagemDiv}>
            <img src="/FaviconLight.png" alt="" />
          </div>
          <div className={classes.temp}>
            <img src="/tempo-restante2.png" alt="" />
            <h3>{formatTime(countdown)}</h3>
          </div>

          <div className={classes.otpDiv}>
            <h1>Insira o código de verificação</h1>
            <OtpInput
              containerStyle={classes.otpInput}
              value={otp}
              onChange={handleChange}
              inputStyle={classes.inputs}
              numInputs={6}
              isInputNum={true}
            />
            <p>
              Não recebeu o código? <a onClick={isClicked}>Reenviar</a>
            </p>
            <button onClick={verifyCode}>Enviar</button>
          </div>
          <div className={classes.login}>
            <p>
              Já tem uma conta? <a href="/">Entre para Logar</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
