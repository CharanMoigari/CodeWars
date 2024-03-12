import React from "react"
import { useState, FormEvent } from "react"
import "./Login.css"
import { GoogleLogin, GoogleCredentialResponse, CredentialResponse } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"
import axios from "axios"
const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleEmailLogin = async (e: FormEvent) => {
      e.preventDefault()
      try{
        const response=await axios.post("http://localhost:4000/api/auth/login",{email,password})
        if(response.status===200){
          localStorage.setItem("token",response.data.token)
          navigate('/home')
        }

      }
      catch(error){
        console.log("error in handleEmailLogin",error)

      }
 
    }

    const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {

      const token = credentialResponse.credential
       try{
        const response = await axios.post("http://localhost:4000/api/auth/google-login",{token})
        console.log(response)
        if(response.status===200){
            localStorage.setItem("token",response.data.token)
            navigate('/home')
        }
       }
       catch(error){
        console.log(error)
       }  
        
    }

    return (
        <>
            <div className="container" id="login">
                <div id="login-heading">
                    <h1>Login</h1>
                </div>
                <div id="googleLogin">
                    
                    <GoogleLogin onSuccess={handleGoogleLogin} />
                </div>
                <div id="login-container">
                    <hr />

                    <div id="login-form-container">
                        <form onSubmit={handleEmailLogin}>
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

                            <div id="login-checkbox">
                                <input type="checkbox" name="remember" id="remember" />
                                <label id="check-tick" htmlFor="remember"></label>
                                <div>
                                    <span>Remember credentials</span>
                                </div>
                            </div>
                            <div id="signupButtonContainer">
                                <button type="submit" >Login</button>
                                <button type="button" onClick={() => navigate("/signup")}>
                                    SignUp
                                </button>
                                <button type="button" onClick={() => navigate("/forgotPassword")}>
                                    Forgot Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
    }


export default Login
