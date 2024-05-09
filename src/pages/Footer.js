import React from 'react'
import "../assets//style/Footer.css"
import { FaFacebook } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className='Footer'>
        <h3>Made by Bisekh Karki</h3>
        <div className='socialIcons'>
            <FaFacebook to='https://www.facebook.com/bisekh.karki/'  target='_blank'/>
            <FaGithub  href='https://github.com/BisekhKarki' />
            <FaLinkedin   href='https://www.linkedin.com/in/bisekh-karki-945b21264/' />
            <FaInstagram  href='https://www.instagram.com/karki_bisekh/' />
        </div>
      </div>
    </>
  )
}

export default Footer
