import React, { useEffect, useRef, useState } from 'react'
import "../assets/style/Horror.css";
import { CgChevronRightO, CgChevronLeftO } from "react-icons/cg";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { FiPlusCircle } from "react-icons/fi";
import { AiFillLike } from "react-icons/ai";
import { FaCircleChevronDown } from "react-icons/fa6";
import { AiFillDislike } from "react-icons/ai";



const Horror = () => {
    const [horrorValues,setHorrorValues] = useState([])
    let horrorCarousel = useRef()
    let singleHorror = useRef()
    let [card,setCard] = useState(0)
    let [horrorImageIndex,sethorrorImageIndex] = useState(0);
    const [horrorLength,setHorrorLength] = useState(0)

    useEffect(()=>{
        async function horrorMovies(){
            let apiKey =  '28ebe13d95487c508f56f7eafba79d50';
            let horrorGenreID = 27;
            const horrorList = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${horrorGenreID}`
           try{
            const horrorData = await fetch(horrorList);
            const horrorResponse =await horrorData.json();
            setHorrorValues(horrorResponse.results)
            setHorrorLength(horrorResponse.length)
          }catch (error){
            error.log(error)
           }
        }
        horrorMovies()
    },[ ])

    const horroTitle = (val)=>{
        if(val.title && val.title!== " "){
            return <p>{val.title}</p>
        }else if(val.nam && val.name !== " "){
            return <p>{val.name}</p>
        } else {
            return <p>No title Available</p>
        }
    }
    // let horrorWidth = singleHorror.current.clientWidth;
    // console.log(horrorWidth)

    let prevNext = (type)=>{
        let horrorWidth = singleHorror.current.clientWidth;
        
        if(type==="next"){
            horrorCarousel.current.style.transform = `translateX(${card - horrorWidth -180}px)`
            if(horrorImageIndex < horrorLength -3){
                sethorrorImageIndex(horrorImageIndex+1)
                setCard(card - horrorWidth -60)
            }
        }if (type==="previous"){
            horrorCarousel.current.style.transform = `translateX(${card + horrorWidth +180}px)`
            if(horrorImageIndex>0){
                sethorrorImageIndex(horrorImageIndex-1)
                setCard(card + horrorWidth +60)
            }
        }
    }
  return (
    <>
    <div className='containerMain'>
    <div className='HeadingAndButton'>
          <p className='heading'>Horror Movies</p>
            <div className='carouselButtons'>
            <button onClick={()=>prevNext("previous")} className='prev' disabled={horrorImageIndex===0}><CgChevronLeftO /></button>
            <button onClick={()=>prevNext("next")} className='next' disabled={horrorImageIndex === horrorLength-8}><CgChevronRightO /></button>
            </div>
        </div>
    <div className='horror' ref={horrorCarousel}>
        {horrorValues.map((val,key)=>{
            return(
                <>
                <div  key={key} className='horrorMovies' ref={singleHorror}>
                    <img src={`https://image.tmdb.org/t/p/original${val.poster_path}`} />
                <div className='horrorInformation'>
                    <div className='buttonsShow'>
                    <div  className='buttonLeft'>
                        <BsFillPlayCircleFill className='playButton'/>
                        <FiPlusCircle />
                        < AiFillLike />
                        <AiFillDislike />
                    </div>
                    <div className='buttonRight'>
                    <FaCircleChevronDown  />
                    </div>
                    </div>
                    <div className='titleAndOthers'>
                        {horroTitle(val)}
                        <p className='rating'> Rating: {val.vote_average}</p>
                        <p className='type'>Genre: {val.media_type}</p>
                    </div>
                </div>

                </div>
                
                </>
            )
        })}
    </div>

    </div>
    </>
  )
}

export default Horror
