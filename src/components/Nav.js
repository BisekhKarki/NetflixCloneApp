import React,{useRef,useState,useEffect} from 'react'
import logo from "../assets/images/logo.png"
  import { Link } from 'react-router-dom'
  import { IoMdNotificationsOutline } from "react-icons/io";
  import { BiSearchAlt } from "react-icons/bi";
  import avatar from "../assets/images/avatar.png"
  import { MdOutlineArrowDropDown } from "react-icons/md";
  import "../assets/style/Nav.css"

const Nav = () => {
    const [showDropDown, setShowDropDown] = useState(false)
    let menuRef = useRef();
    function showDrop(){
        setShowDropDown(!showDropDown)
      }
      useEffect(()=>{
        let handler = (e)=>{
          if (!menuRef.current.contains(e.target)) {
            setShowDropDown(false);
          } 
        }
        document.addEventListener('mousedown',handler);
        return ()=>{
          document.removeEventListener('mousedown',handler)
        }
      })
  
  return (
    <div>
      <nav className='navigation'>
          <div className="logoAndNav">
            <img src={logo} alt='logo of netflix' className='logoNetflix'/>
            <ul className='navLists'>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/shows">TV Shows</Link></li>
              <li><Link to="/movies" >Movies</Link></li>
              <li><Link to="/new" >New & Popular</Link></li>
              <li><Link to="/list" >My List</Link></li>
            </ul>
          </div>
          <div className="searchNotification" ref={menuRef}>
            <BiSearchAlt className='searchIcon' />
            <input className='searchAnything' placeholder='Title, people, genre'/>
            <IoMdNotificationsOutline className='notificationIcon' />
            <img src={avatar} className='avatar' alt='avatar' />
            <MdOutlineArrowDropDown className='dropDown' onClick={showDrop} />
            
            {
              showDropDown ? <div className="singOut">
              <Link to="/">Sign out</Link>
            </div> : ""
            }
          </div>
        </nav>
    </div>
  )
}

export default Nav
