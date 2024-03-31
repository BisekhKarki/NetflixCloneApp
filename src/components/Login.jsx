import React, { useState } from 'react'
import "../assets/style/Login.css"
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import logo from "../assets/images/logo.png"
import Home from '../pages/HomePage';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(true)
  const [checkBox,setCheckBox] = useState(false);
  const [direction,setDirection] = useState(false);

  const homePage = ()=>{
    setDirection(!direction)
  }

  const [sign,setSign] = useState(false);
    const changeCompo = ()=>{
        setSign(!sign);
    }

  function okay(){
    setCheckBox(!checkBox)

  }
  
  const changeIcon = ()=>{
    setShowPassword(!showPassword)
  }
    return (
      <div className='login'>
      <div className='loginNav'>
     <img src={logo} alt='Netflix logo' className='logo'  />
     {sign ? "" : <button onClick={changeCompo} className='buttonLogin'>Sign In</button>}
   </div>
       {sign ? <div className="loginSection">
         <h1>Sign In</h1>
       <div className="inputFields">
        <input className='userEmail' placeholder='Email or phone number' />
         <input className='userPass' placeholder='Password'  type={showPassword ? "password" : "text" } />
         <button onClick={changeIcon} className='showOrHide' >{ showPassword ? <AiFillEyeInvisible />  : <AiFillEye />}</button>
       </div>
       <div className="loginButtons">
         <Link className='signIn' to="/home">Sign In</Link>
         <p>OR</p>
         <button className='codeSignin'>Use a Sign-In Code</button>
         <p>Forgot password?</p>
       </div>
       <div className="lastSection">
         <div className="check">
         <button className='done' onClick={okay} >{checkBox ? < MdCheckBox  style={{color:'white'}}   /> : <MdCheckBoxOutlineBlank style={{color:'white'}} />}</button>
         <p>Remeber me</p>
         </div>
         <div className="new">
         <span className='newNetflix'>New To Netflix?</span>
         <span className='register'>Sign up now.</span>
         </div>
         <div className="last">
         <span className='lastLine'>This page is protected by Google reCAPTCHA to<br></br>
         ensure you're not a bot.</span>
         <span className='learnMore'>learn more.</span>
         </div>
        
       </div>

       </div>  : ""}
   </div>
    ) 
}

export default Login
