import React, { useEffect, useRef, useState } from 'react'
import "../assets/style/Horror.css";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
// import { BsFillPlayCircleFill } from "react-icons/bs";
// import { FiPlusCircle } from "react-icons/fi";
// import { AiFillLike } from "react-icons/ai";
// import { FaCircleChevronDown } from "react-icons/fa6";
// import { AiFillDislike } from "react-icons/ai";
import "../assets/style/ScienceFiction.css"

const SciFi = () => {
    const [sifi,setSifi] = useState([])
    let [lengths,setLengths] = useState(0)
    let singleSifi = useRef();
    let sifiCarousal = useRef();
    let [card,setCard] = useState(0)
    let [index,setIndex] = useState(0) 
    
   useEffect(()=>{
    const ScienceFiction = async ()=>{
        const apiKey ='28ebe13d95487c508f56f7eafba79d50';
        const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${18}`
        try{
            let data = await fetch(apiUrl)
            let response = await data.json();
            setSifi(response.results)
            setLengths(response.results.length)

        }catch(error){
            console.log(error)
        }
    }
    ScienceFiction()

   },[])

   const setCarousal = (type)=>{
    let scifiWidth = singleSifi.current.clientWidth;
    if(type==="next"){
        sifiCarousal.current.style.transform = `translateX(${card - scifiWidth - 60}px)`
        if(index<lengths-2){
            setCard(card - scifiWidth-60)
            setIndex(index +1)
        }

    } else if(type==="prev"){
        sifiCarousal.current.style.transform = `translateX(${card + scifiWidth + 60}px)`
        if(index>0){
            setCard(card + scifiWidth+60)
            setIndex(index-1)
        }
    }


   }

//    const titleShow = (t)=>{
//     if(t.title && t.title !== ""){
//         return <h3>{t.title}</h3>
//     } else if (t.name && t.name !== ""){
//         return <h3>{t.name}</h3>
//     }else {
//         return <h3>No titles available</h3>
//     }
//    }


// const informations = (values)=>{

//         return(
//             <div className='informations'>
//             <div className='infoButton'>
//               <div className='leftButton'>
//               <BsFillPlayCircleFill className='playButton'/>
//               <FiPlusCircle />
//               < AiFillLike />
//               <AiFillDislike />
//               </div>
//               <div className='rightButton'>
//                 <FaCircleChevronDown  />
//               </div>
//             </div>
//             <div className='titleAndOther'>
//               {titleShow(values)}
//               <p className='rating'>Rating: {values.vote_average}</p>
//               <p className='type'>Release Date: {values.release_date}</p>
//             </div>
//           </div>
//         )
//     }

  return (
    <>
    <div className='mainSifi'>
    <h1>Science Fiction </h1>
    <div className='scienceFiction' ref={sifiCarousal}>
    {
        sifi.map((sifi,key)=>{
            return (
                <>
                <div className='sifiMovies' key={key} ref={singleSifi}>
                <img src={`https://image.tmdb.org/t/p/original${sifi.poster_path}`} />  
                {/* {informations(h)}    */}
                </div>
                </>
            )
        })
    }
    </div>
    <div className='sifiButtons'>
    <button className='lefSifi' onClick={()=>setCarousal("prev")} disabled={index===0}><FaChevronLeft /></button>
    <button className='rightSifi' onClick={()=>setCarousal("next")} disabled={index === lengths - 9}  ><FaChevronRight/></button>
    </div>
    
    </div>
    </>
  )
}

export default SciFi
