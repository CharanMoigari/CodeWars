import React from 'react'; 
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "../Pages/HomePage/Home"
import Login from "../Pages/LoginPage/Login"
import SignUp from "../Pages/SignUpPage/SignUp"
import CodeWars from '../Pages/CodeWarsPage/CodeWars';
import Landing from '../Pages/Landing/Landing';
import ProblemForm from '../Pages/ProblemForm/ProblemForm';
export default function Navbar(){
    return (
        <BrowserRouter>
        <div >
        <Routes>
        <Route path="/" element={<CodeWars/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/code-editor" element={<Landing/>}/>
            <Route path="/problemform" element={<ProblemForm/>}/>
        </Routes>
        </div>
        </BrowserRouter>

    )
}