import React, { FormEvent, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "../LoginPage/Login.css"

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
  <>
      <div className="container" id="login">
          <div id="login-heading">
              <h1>SignUp</h1>
          </div>
          <div id="login-container">

              <div id="login-form-container">
                  <form onSubmit={handleSignUp}>
                  <div className="input-container">
                          <input
                              className="login-input"
                              type="userName"
                              name="userName"
                              id="userName"
                              onChange={(e) => setUserName(e.target.value)}
                              value={userName}
                              autoComplete={"on"}
                              autoFocus={true}
                              placeholder="UserName"
                              required
                          />
                          <label className="label" htmlFor="userName">
                              UserName
                          </label>
                          <div className="input-error"></div>
                      </div>
                      <div className="input-container">
                          <input
                              className="login-input"
                              type="email"
                              name="email"
                              id="email"
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                              autoComplete={"on"}
                              autoFocus={true}
                              placeholder="Email"
                              required
                          />
                          <label className="label" htmlFor="email">
                              Email
                          </label>
                          <div className="input-error"></div>
                      </div>
                      <div className="input-container">
                          <input
                              className="login-input"
                              type="password"
                              name="password"
                              id="password"
                              onChange={(e) => setPassword(e.target.value)}
                              value={password}
                              autoComplete="on"
                              placeholder="Password"
                              required
                          />
                          <label className="label" htmlFor="password">
                              Password
                          </label>
                          <div className="input-error"></div>
                      </div>
                      <div id="signupButtonContainer">
                          <button type="submit" >SignUp</button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  </>
)
}
