import React, { useState,useEffect } from 'react';
import './App.css';
import SiteRoutes from "../src/Components/Routes/SiteRoutes"
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { faLinesLeaning, faScaleBalanced } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [isLoggedIn,setIsLoggedIn]=useState(false)
  const token=localStorage.getItem("token")
  useEffect(()=>{
    setIsLoggedIn(token?true:false)
  },[])
  return (
    <div className="App">
      <SiteRoutes />
    </div>
  );
}

export default App;
