import React, { FormEvent, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleLogin= async (e: FormEvent) => {
    e.preventDefault(); 

    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', {
        email,
        password
      });
      if (response.status === 200 || response.status===400) { 
        navigate("/user-interface"); 
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}
