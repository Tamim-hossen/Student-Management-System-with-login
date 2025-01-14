import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './component/Login.jsx'
import Signup from './component/Signup.jsx'
import Home from './component/Home.jsx'
import Create from './component/Create.jsx'
import Edit from './component/Edit.jsx'
import View from './component/View.jsx'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/edit/:id' element={<Edit/>}/>
        <Route path='/view/:id' element={<View/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App