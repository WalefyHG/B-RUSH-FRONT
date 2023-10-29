import classes from "./Teste.module.css";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form"
const Teste = () => {
  // React Hook Forms
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [response, setResponse] = useState(null);
  const [image, setImage] = useState(null);
  

  const onSubmit = async (data) =>{

    const formsData = new FormData()
    formsData.append("user", JSON.stringify(data))
    formsData.append("image", image)
    try{
      const response = await axios.post('http://127.0.0.1:8000/api/users/criando', formsData);
      setResponse(response.data)
    }catch(error){
      console.error("Erro ao enviar formulario: ", error)
    }
  }


  return (
    <div className={classes.mainContainer}>
      <h2>Formulario no React: </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="user_name">Nome: </label>
          <input 
          type="text"
          name="user_name"
          {...register("user_name", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="user_email">Email: </label>
          <input 
          type="email" 
          name="user_email"
          {...register("user_email", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="user_password">Password: </label>
          <input 
          type="password" 
          name="user_password"
          {...register("user_password", { required: true })}

          />
        </div>
        <div>
          <label htmlFor="user_image">Imagem: </label>
          <input 
          type="file" 
          name="user_image"
          onChange={(e) => {
            setImage(e.target.files[0])
          }}
          />
        </div>
        <input type="submit" value="Enviar" />
      </form>


      {response && (
        <div>
          <h2>Resposta do servidor: </h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

    </div>
  );
};

export default Teste;
