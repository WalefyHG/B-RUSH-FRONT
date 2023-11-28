import React, {useState} from "react";
import classes from "./Cadastro.module.css";
import Name  from "../../formSteps/Name";
import Upload  from "../../formSteps/Upload";
import Password from "../../formSteps/Password";
import Games from "../../formSteps/Games";
import {
  FaChevronRight,
  FaChevronLeft
} from "react-icons/fa";
import { RiSendPlane2Fill } from "react-icons/ri";
import Steps from "../../formSteps/Steps";
import { useForm } from "react-hook-form";
import { useForm as FormsData} from "../../hooks/useForm";
import axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom';


const formsTemplate = {
  user_name: "", 
  user_lastName: "",
  user_birthday: "",
  user_email: "",
  user_password: "",
  user_firstName: "",
  user_idioma: "Português",
  user_games: "CS:GO",
  user_pais: "Brasil",
}

const Cadastro = () => {

  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState(formsTemplate);
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  const updateFieldHandler = (key, value) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const formsComponents = [
  <Name data={data} updateFieldHandler={updateFieldHandler} />, 
  <Upload data={data} updateFieldHandler={updateFieldHandler} />, 
  <Password data={data} updateFieldHandler={updateFieldHandler} />,
  <Games data={data} updateFieldHandler={updateFieldHandler} />]

  const {currentStep, currentComponent, changeSteps, isLastStep, isFirstStep} = FormsData(formsComponents);


  const handleFormSubmission = (e) => {
    e.preventDefault(); // Impede que o formulário seja enviado prematuramente
  
    if (!isLastStep) {
      // Se não for a última etapa, avance para a próxima etapa
      changeSteps(currentStep + 1);
    } else {
      // Se for a última etapa, envie o formulário
      handleSubmit(onSubmit)();
    }
  };

  const onSubmit = async () =>{
    const formData = new FormData();
    const dataImagem = data.image
    delete data.image
    formData.append('user', JSON.stringify(data));
    formData.append("image", dataImagem);
    try{
      const response = await axios.post('http://127.0.0.1:8000/api/users/criando', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if(response.status === 200){
        navigate('/perfil');
        reset();
      }
      }
    catch(error){
        console.error("Erro ao enviar formulario: ", error);
        console.log(response)
      }
  }

  return (
    <>
      <div className={classes.mainContainer}>
        <div className={classes.container}>
          <div className={classes.header}>
            <img src="/FaviconLight.png" alt="" />
            <p>Faça Aqui o Seu Cadastro no B-Rush</p>
          </div>
          <div className={classes.formContainer}>
            <Steps currentStep={currentStep} />
            <form onSubmit={handleFormSubmission}>
              <div className={classes.inputsContainer}>{currentComponent}</div>
              <div className={classes.action}>
                {!isFirstStep && (
                  <button type="button" onClick={() => changeSteps(currentStep - 1)}>
                  <FaChevronLeft />
                  <span>Voltar</span>
                  </button>
                )}
                {!isLastStep ? (
                    <button type="submit">
                    <span>Avançar</span>
                    <FaChevronRight />
                    </button>
                ) : (
                  <button type="submit">
                  <span>Enviar</span>
                  <RiSendPlane2Fill />
                  </button>
                )}
              </div>
            </form>

          </div>


        </div>

      </div>
    </>
  );
};

export default Cadastro;
