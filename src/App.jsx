import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/home'
import Perfil from './pages/Perfil/Perfil'
import Config from './pages/Configuracao/Config'
import Cadastro from './pages/Cadastro/Cadastro'
import Info from './pages/ConfiguracaoInfo/Info'
import Teste from './pages/Teste/Teste'
import AlterSenha from './pages/AlterSenha/AlterSenha'
import Loading from './components/Loading/Loading'
import Ajuda from './pages/Ajuda/Ajuda'
import TesteForm from './pages/TestForm/TesteForm'
import PrivateRouter from './components/PrivateRouter/PrivateRouter'
import PesquisaResults from './pages/searchResults/PesquisaResults'
import PerfilUsuario from './pages/PerfilUsuario/PerfilUsuario'
import Notification from './pages/Notification/Notification'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
        <Routes>
          <Route path='/perfil' element={
        <PrivateRouter>
          <Perfil/>
        </PrivateRouter>
      }/>
        </Routes>
        <Routes>
          <Route path='/config' element={<Config/>}/>
        </Routes>
        <Routes>
          <Route path='/cadastro' element={<Cadastro/>}/>
        </Routes>
        <Routes>
          <Route path='/info' element={<Info/>}/>
        </Routes>
        <Routes>
          <Route path='/alterarSenha' element={<AlterSenha/>}/>
        </Routes>
        <Routes>
          <Route path='/ajuda' element={<Ajuda/>}/>
        </Routes>
        <Routes>
          <Route path='/testeForm' element={<TesteForm/>}/>
        </Routes>
        <Routes>
          <Route path='/teste' element={<Teste/>}/>
        </Routes>
        <Routes>
          <Route path='/loading' element={<Loading/>}/>
        </Routes>
        <Routes>
          <Route path='/notification' element={<Notification/>}/>
        </Routes>
        <Routes>
          <Route path='/pesquisar/:user_firstName' element={
          <PrivateRouter>
          <PesquisaResults/>
          </PrivateRouter>
          }/>
          <Route path='/perfil/:user_name' element={
          <PrivateRouter>
          <PerfilUsuario/>
          </PrivateRouter>
          }/>
        </Routes>
      </Router>
    </>
  )
}

export default App
