import React, { useEffect, useRef, useState } from 'react'
import "../assets/style/Horror.css";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { FiPlusCircle } from "react-icons/fi";
import { AiFillLike } from "react-icons/ai";
import { FaCircleChevronDown } from "react-icons/fa6";
import { AiFillDislike } from "react-icons/ai";
import { ImCross } from "react-icons/im";

const Horror = () => {
    const [horror,setHorror] = useState([])
    let [lengths,setLengths] = useState(0)
    let singlehorror = useRef();
    let horrorCarousal = useRef();
    let [card,setCard] = useState(0)
    let [index,setIndex] = useState(0) 
    const [showHorror, setShowHorror] = useState(false)
    const [horrorBig, setHorrorBig] = useState([])

   useEffect(()=>{
    const horrorMovies = async ()=>{
        const apiKey ='28ebe13d95487c508f56f7eafba79d50';
        const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${27}`
        try{
            let data = await fetch(apiUrl)
            let response = await data.json();
            setHorror(response.results)
            setLengths(response.results.length)

        }catch(error){
            console.log(error)
        }
    }
    horrorMovies()

   },[])

   const setCarousal = (type)=>{
    let horrorWidth = singlehorror.current.clientWidth;
    if(type==="next"){
        horrorCarousal.current.style.transform = `translateX(${card - horrorWidth - 60}px)`
        if(index<lengths-2){
            setCard(card - horrorWidth-60)
            setIndex(index +1)
        }

    } else if(type==="prev"){
        horrorCarousal.current.style.transform = `translateX(${card + horrorWidth + 60}px)`
        if(index>0){
            setCard(card + horrorWidth+60)
            setIndex(index-1)
        }
    }


   }

   const titleShow = (t)=>{
    if(t.title && t.title !== ""){
        return <h3>{t.title}</h3>
    } else if (t.name && t.name !== ""){
        return <h3>{t.name}</h3>
    }else {
        return <h3>No titles available</h3>
    }
   }


   const displayContent = (items)=>{
    setHorrorBig(items)
    setShowHorror(!showHorror)
   }


   const informations = (val)=>{
    return(
        <>
        <div className='showBigScreenHorror' style={{display : showHorror ? "block" : "none" }}>
        <ImCross className='wrong' onClick={()=>setShowHorror(!showHorror)} />
          <img src={`https://image.tmdb.org/t/p/original${val.poster_path}`}  className='bigPosterHorror'  />
          <div className='informationsHorror'>
        <div className='infoButtonHorror'>
          <div className='leftButtonHorror'>
          <BsFillPlayCircleFill className='playButtonHorror' />
          <FiPlusCircle onClick={()=>setToLocalStorage(val)} />
          <AiFillLike />
          <AiFillDislike />
          </div>
          <div className='rightButtonHorror'>
            <FaCircleChevronDown   />
          </div>
        </div>
        <div className='titleAndOtherHorror'>
          {titleShow(val)}
          <p className='ratingHorror'>Rating: {val.vote_average}</p>
          <p className='typeHorror'>Release Date: {val.release_date}</p>
        </div>
      </div>
        </div>
        
        </>
        
    )
}

  return (
    <>
    <div className='mainHorror'>
    <h1>Horror</h1>
    <div className='horror' ref={horrorCarousal}>
    {
        horror.map((h,key)=>{
            return (
                <>
                <div className='horrorMovies' key={key} ref={singlehorror}>
                <img src={`https://image.tmdb.org/t/p/original${h.poster_path}`} onClick={()=>displayContent(h)} />  
                
                </div>
                </>
            )
        })
    }
    </div>
    <div className='horrorButtons'>
    <button className='leftHorror' onClick={()=>setCarousal("prev")} disabled={index===0}><FaChevronLeft /></button>
    <button className='rightHorror' onClick={()=>setCarousal("next")} disabled={index === lengths - 9}  ><FaChevronRight/></button>
    {informations(horrorBig)}
    </div>
      
    </div>

    </>
  )
}

export default Horror
