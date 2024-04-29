import React, { useEffect, useRef, useState } from 'react'
import { CgChevronRightO, CgChevronLeftO } from "react-icons/cg";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { FiPlusCircle } from "react-icons/fi";
import { AiFillLike } from "react-icons/ai";
import { FaCircleChevronDown } from "react-icons/fa6";
import { AiFillDislike } from "react-icons/ai";
import "../assets/style/Comedy.css";

const Comedies = () => {

    const [comedyMovies, setComedyMovies] = useState([])
    const [comedyLength, setComedyLength] = useState(0)
    let comedySingle = useRef()
    let comedyCarousal = useRef()
    let [comedyIndex,setComedyIndex] = useState(0)
    let [comedyCard, setComedyCard] = useState(0)


    useEffect( ()=>{
        async function getComdies(){
            let apiKey = '28ebe13d95487c508f56f7eafba79d50';
            let apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${35}`
    
            try{
                const comdeyData = await fetch(apiUrl)
                const comdeyValues = await comdeyData.json()
                setComedyMovies(comdeyValues.results)
                setComedyLength(comdeyValues.results.length)
                console.log(comedyLength)
            }catch (error){
                console.log(error)
            }
        }
       
        getComdies()

    },[])

    const comedyTitle = (val)=>{
        if(val.title && val.title!== " "){
            return <p>{val.title}</p>
        }else if(val.nam && val.name !== " "){
            return <p>{val.name}</p>
        } else {
            return <p>No title Available</p>
        }
    }


    const changeComp = (type)=>{
        let comedyWidth = comedySingle.current.clientWidth
        if (type==="next"){
            comedyCarousal.current.style.transform = `translateX(${comedyCard - comedyWidth - 60}px)`;
            if(comedyIndex< comedyLength -3){
                setComedyIndex(comedyIndex+1);
                setComedyCard(comedyCard - comedyWidth - 60)
            }
        } else if (type === "prev"){
            comedyCarousal.current.style.transform = `translateX(${comedyCard + comedyWidth + 60}px)`
            if(comedyIndex >0){
                setComedyIndex(comedyIndex -1)
                setComedyCard(comedyCard + comedyWidth + 60)
            }
        }
        
    }

    const showBigScreen = (titles)=>{
        console.log(titles)
    }

  return (
    <>
   <div>
        <div className='mainComedy'>
        <div className='HeadingAndButton'>
          <p className='heading'>Comedy Movies</p>
            <div className='comedyCarousal'>
            <button className='prev' onClick={()=>changeComp("prev")} disabled={comedyIndex===0} ><CgChevronLeftO /></button>
            <button  className='next' onClick={()=>changeComp("next")} disabled={comedyIndex === comedyLength -8}  ><CgChevronRightO /></button>
            </div>
        </div>
        
        <div className='comedy' ref={comedyCarousal} > 
        {
          comedyMovies.map((val,key)=>{
            return(
              <>
              <div className='comedyMovies' key={key}  ref={comedySingle} >
              <img src={`https://image.tmdb.org/t/p/original${val.poster_path}`} />
              
              <div className='comedyInformation'>
                <div className='showComedy'>
                  <div className='comedyLeft'>
                  <BsFillPlayCircleFill className='playComedy'/>
                  <FiPlusCircle />
                  < AiFillLike />
                  <AiFillDislike />
                  </div>
                  <div className='rightButton'>
                    <FaCircleChevronDown onClick={()=>showBigScreen(val.title)}  />
                  </div>
                </div>
                <div className='titleAndOther'>
                  {comedyTitle(val)}
                  <p className='rating'>Rating: {val.vote_average}</p>
                  <p className='type'>Genre: {val.media_type}</p>
                </div>
              </div>
              </div>
              </>
            )
          })
        }
        </div>
        
        </div>
        
        
      </div>


    </>
  )
}

export default Comedies
