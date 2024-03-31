import React, { useEffect, useState } from 'react'
import logo from "../assets/images/logo.png"
import { Link } from 'react-router-dom'
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiSearchAlt } from "react-icons/bi";
import avatar from "../assets/images/avatar.png"
import "../assets/style/Home.css"
import { MdOutlineArrowDropDown } from "react-icons/md";

const Home = () => {

  const [showDropDown, setShowDropDown] = useState(false)
  function showDrop(){
    setShowDropDown(!showDropDown)
  }

  const [lists,setLists] = useState([])

  useEffect(()=>{
    async function FavouriteMovies(){
      const apiKey = '28ebe13d95487c508f56f7eafba79d50';
      const lists = `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&page=${1}`
      try{
        let response = await fetch(lists)
        let data =await response.json();
        setLists(data.results);
        console.log(data)
      }catch(error){
        console.log(error)
      }
    }
    FavouriteMovies()

  },[ ])

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
        <div className="searchNotification">
          <BiSearchAlt className='searchIcon' />
          <input className='searchAnything' placeholder='Title, people, genre'/>
          <IoMdNotificationsOutline className='notificationIcon' />
          <img src={avatar} className='avatar' alt='avatar' />
          <MdOutlineArrowDropDown className='dropDown' onClick={showDrop}/>
          {
            showDropDown ? <div className="singOut">
            <Link to="/">Sign out</Link>
          </div> : ""
          }
        </div>
      </nav>
     
      {
        lists.map((items,key)=>{
          return(
            <>

            <img src={`https://image.tmdb.org/t/p/original${items.poster_path}`} /> 
            </>
          )
        })
      }
    </div>
  )
}

export default Home
