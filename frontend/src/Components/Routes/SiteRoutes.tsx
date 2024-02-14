import React from 'react'; 
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "../Pages/HomePage/Home"
import Login from "../Pages/LoginPage/Login"
import SignUp from "../Pages/SignUpPage/SignUp"
import CodeWars from '../Pages/CodeWarsPage/CodeWars';
export default function Navbar(){
    return (
        <BrowserRouter>
        <div >
        <Routes>
        <Route path="/" element={<CodeWars/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
        </Routes>
        </div>
        </BrowserRouter>

    )
}