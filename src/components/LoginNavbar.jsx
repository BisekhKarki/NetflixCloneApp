import React, { useState } from 'react'
import logo from "../assets/images/logo.png"
import Login from './Login';

const LoginNavbar = () => {

    const [sign,setSign] = useState(false);
    const changeCompo = ()=>{
        setSign(!sign);
        <Login val={sign} />
    }

  return (
    <>
    <div className='loginNav'>
      <img src={logo} alt='Netflix logo' className='logo'  />
      {sign ? "" : <button onClick={changeCompo} className='buttonLogin'>Sign In</button>}
    </div>
    </>
  )
}

export default LoginNavbar
