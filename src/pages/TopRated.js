import React, { useEffect, useRef, useState } from 'react'
import { CgChevronRightO, CgChevronLeftO } from "react-icons/cg";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { FiPlusCircle } from "react-icons/fi";
import { AiFillLike } from "react-icons/ai";
import { FaCircleChevronDown } from "react-icons/fa6";
import { AiFillDislike } from "react-icons/ai";
import "../assets/style/TopRated.css"

const TopRated = () => {

    const [topRatedMovies, setTopRated] = useState([])
    let singleCarousal = useRef();
    let topCarousal = useRef();
    let [topIndex, setTopIndex] = useState(0)
    const [topLength, setTopLength] = useState(0);
    let [topCard,setTopCard] = useState(0)



    useEffect(()=>{
        async function getHighRated(){
            let apiKey = '28ebe13d95487c508f56f7eafba79d50'
            let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;
            try{
                const top = await fetch(url);
                const data = await top.json()
                setTopRated(data.results)
                setTopLength(data.results.length)
            }catch (error){
                console.log(error)
            }
        }
        getHighRated()

    },[ ])


    const move = (Toptype)=>{
        let topWidth = singleCarousal.current.clientWidth
        if(Toptype === "next"){
            topCarousal.current.style.transform = `translateX(${topCard - topWidth - 60}px)`
            if(topIndex < topLength -3 ){
              setTopCard(topIndex+1)
              setTopIndex(topCard - topWidth - 60);
                
            }
        } else if (Toptype === "prev"){
            topCarousal.current.style.transform = `translateX(${topCard + topWidth + 60}px)`;
            if(topIndex>0){
              setTopCard(topIndex-1)
              setTopIndex(topCard + topWidth + 60);
               
            }
        }


    }
     
    const topTitle = (val)=>{
        if(val.title && val.title != ""){
            return <p>{val.title}</p>
        }else if(val.nam && val.name !== " "){
            return <p>{val.name}</p>
        } else {
            return <p>No title Available</p>
        }
    }

    const showBigScreen = (val)=>{
        console.log(val)
    }
  return (
    <>
   <div className='topMain'>
        <div className='HeadingAndButton'>
          <p className='heading'>Top Movies</p>
            <div className='topCarousal'>
            <button className='prev' onClick={()=> move("prev")}  disabled={topIndex===0} ><CgChevronLeftO /></button>
            <button  className='next' onClick={()=> move("next")}  disabled={topIndex=== topLength-8} ><CgChevronRightO /></button>
            </div>
        </div>
        
        <div className='top' ref={topCarousal}>   
        {
          topRatedMovies.map((values,key)=>{
            return(
              <>
              <div className='topMovies' key={key} ref={singleCarousal}  >
              <img src={`https://image.tmdb.org/t/p/original${values.poster_path}`} />
              
              <div className='topInformation'>
                <div className='showTop'>
                  <div className='topLeft'>
                  <BsFillPlayCircleFill className='playTop'/>
                  <FiPlusCircle />
                  < AiFillLike />
                  <AiFillDislike />
                  </div>
                  <div className='rightButton'>
                    <FaCircleChevronDown onClick={()=>showBigScreen(values.title)}  />
                  </div>
                </div>
                <div className='titleAndOther'>
                  {topTitle(values)}
                  <p className='rating'>Rating: {values.vote_average}</p>
                  <p className='type'>Genre: {values.media_type}</p>
                </div>
              </div>
              </div>
              </>
            )
          })
        }
        </div>
        </div>
    </>
  )
}

export default TopRated
