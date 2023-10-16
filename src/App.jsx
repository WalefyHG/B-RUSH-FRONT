import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/home'
import Perfil from './pages/Perfil/Perfil'
import Config from './pages/Configuracao/Config'
import Cadastro from './pages/Cadastro/Cadastro'
import Info from './pages/ConfiguracaoInfo/Info'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
        <Routes>
          <Route path='/perfil' element={<Perfil/>}/>
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
      </Router>
    </>
  )
}

export default App
