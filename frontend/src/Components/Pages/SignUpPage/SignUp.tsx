import React, { FormEvent, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate(); 

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault(); 

    try {
      const response = await axios.post('http://localhost:4000/api/auth/signup', {
        userName,
        email,
        password
      });
      if (response.status === 200 || response.status===400) { 
        navigate("/login"); 
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignUp}>
        <label htmlFor="username">UserName</label>
        <input id="username" name="username" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} /><br />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <button type='submit'>SignUp</button>
      </form>
    </div>
  );
}
