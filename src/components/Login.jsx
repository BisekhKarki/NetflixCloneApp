import React, { useState } from 'react'
import LoginNavbar from './LoginNavbar'
import "../assets/style/Login.css"
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";


const Login = ({val}) => {
  const [showPassword, setShowPassword] = useState(true)
  const [checkBox,setCheckBox] = useState(false);

  function okay(){
    setCheckBox(!checkBox)
  }
  const changeIcon = ()=>{
    setShowPassword(!showPassword)
  }
  return (
    <div className='login'>
      <LoginNavbar />
        {val ? <div className="loginSection">
          <h1>Sign In</h1>
        <div className="inputFields">
         <input className='userEmail' placeholder='Email or phone number' />
          <input className='userPass' placeholder='Password'  type={showPassword ? "text" : "password"} />
          <button onClick={changeIcon} className='showOrHide'>{ showPassword ? <AiFillEye /> : <AiFillEyeInvisible /> }</button>
        </div>
        <div className="loginButtons">
          <button className='signIn'>Sign In</button>
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
