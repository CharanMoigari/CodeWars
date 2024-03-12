import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './CodeWars.css';

const CodeWars: React.FC = () => {
  const user=localStorage.getItem("token")
  const navigate=useNavigate();
  useEffect(()=>{
    if(user){
      navigate("/home")
    }
})
  return (
    <div className="codewars-container">
      {/* Background video */}
      <div className='video-container'>
      <video autoPlay loop muted className="background-video">
        <source src="/assets/Videos/blue.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay">
        <h1>CodeWars</h1>
        <p>where you can challenge yourself with a wide range of coding problems and improve your programming skills. Whether you're a beginner or an experienced coder, our platform offers diverse challenges to suit your level. Join our community, compete with others, and embark on your coding journey today</p>
      </div>
      </div>

      <h1 className='feature-h1'>Features</h1>

      <div className="feature-container">
        <div className="feature-box">
          <img src='/assets/images/interview-logo.jpg' alt="Feature 1" className="feature-image" />
          <h3>Interview Experience Preparation</h3>
        </div>
        <div className="feature-box">
          <img src="/assets/images/learning-logo.jpg" alt="Feature 2" className="feature-image" />
          <h3>Personalized Learning Paths</h3>
        </div>
        <div className="feature-box">
          <img src="/assets/images/robust-coding.jpg" alt="Feature 3" className="feature-image" />
          <h3>Robust Coding Practice Environment</h3>
        </div>
        </div>

    <div className="row justify-content-center testimonials">
    <h1 className='test-h1'>Testimonals</h1>
      <div className="col-sm-11 col-md-9 col-lg-9 col-xl-7">
        <div className="card">
          <p className="post">
            <span><img className="quote-img" src="https://i.imgur.com/i06xx2I.png" alt="quote" /></span>
            <span className="post-txt">I upgraded my Dribble account to the Pro version. Absolutely loving the super clean look of the Playbook feature</span>
            <span><img className="nice-img" src="https://i.imgur.com/l5AkSHd.png" alt="nice" /></span>
          </p>
          </div>
        <div className="arrow-down"></div>
        <div className="row justify-content-center profile">
          <div className="col-auto">
            <img className="profile-pic fit-image" src="https://i.imgur.com/RCwPA3O.jpg" alt="profile" />
          </div>
          <div className="col-auto align-self-center">
            <p className="profile-name">Srija</p>
          </div>
        </div>
      </div>
      <div className="col-sm-11 col-md-9 col-lg-9 col-xl-7 " >
        <div className="card">
          <p className="post">
            <span><img className="quote-img" src="https://i.imgur.com/i06xx2I.png" alt="quote" /></span>
            <span className="post-txt">I upgraded my Dribble account to the Pro version. Absolutely loving the super clean look of the Playbook feature</span>
            <span><img className="nice-img" src="https://i.imgur.com/l5AkSHd.png" alt="nice" /></span>
          </p>
          </div>
        <div className="arrow-down"></div>
        <div className="row justify-content-center profile">
          <div className="col-auto">
            <img className="profile-pic fit-image" src="/assets/images/testimonal.jpg" alt="profile" />
          </div>
          <div className="col-auto align-self-center">
            <p className="profile-name">Vamshi</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default CodeWars;