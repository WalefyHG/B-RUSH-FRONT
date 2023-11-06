import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/home'
import Perfil from './pages/Perfil/Perfil'
import Config from './pages/Configuracao/Config'
import Cadastro from './pages/Cadastro/Cadastro'
import Info from './pages/ConfiguracaoInfo/Info'
import Teste from './pages/Teste/Teste'
import AlterSenha from './pages/AlterSenha/AlterSenha'
import Ajuda from './pages/Ajuda/Ajuda'
import TesteForm from './pages/TestForm/TesteForm'
import PrivateRouter from './components/PrivateRouter/PrivateRouter'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
        <PrivateRouter>
        <Routes>
          <Route path='/perfil' element={<Perfil/>}/>
        </Routes>
        </PrivateRouter>
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
      </Router>
    </>
  )
}

export default App
