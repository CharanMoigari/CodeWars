import React from 'react'; 
import { BrowserRouter, Routes, Route} from "react-router-dom"

import Home from "../../Pages/HomePage/Home"
import Login from "../../Pages/LoginPage/Login"
import SignUp from "../../Pages/SignUpPage/SignUp"
import CodeWars from '../../Pages/CodeWarsPage/CodeWars';
import Landing from '../../Pages/Landing/Landing';
import ProblemForm from '../../Pages/ProblemForm/ProblemForm';
import Problems from '../../Pages/Problems/Problems';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import PrivateRoute from './PrivateRouter';

export default function Navbar(){
    return (
        <BrowserRouter>
        <div><Header/></div>
        <div >
        <Routes>
            <Route path="/" element={<CodeWars/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/problemform" element={<ProblemForm/>}/>
            <Route path="/problems" element={<Problems/>}/>
        <Route element={<PrivateRoute/>}>
        <Route path="/home" element={<Home/>}/>
        <Route path="/code-editor" element={<Landing/>}/>
        </Route>
        </Routes>
        </div>
        <div><Footer/></div>
        </BrowserRouter>

    )
}