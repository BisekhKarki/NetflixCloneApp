import React, { useEffect, useRef, useState } from 'react'
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
// import { BsFillPlayCircleFill } from "react-icons/bs";
// import { FiPlusCircle } from "react-icons/fi";
// import { AiFillLike } from "react-icons/ai";
// import { FaCircleChevronDown } from "react-icons/fa6";
// import { AiFillDislike } from "react-icons/ai";
import "../assets/style/Drama.css"



const Drama = () => {


    const [Dramas,setDrama] = useState([])
    let [lengths,setLengths] = useState(0)
    let singleDrama = useRef();
    let DramaCarousal = useRef();
    let [card,setCard] = useState(0)
    let [index,setIndex] = useState(0) 
    
   useEffect(()=>{
    const DramaMovies = async ()=>{
        const apiKey ='28ebe13d95487c508f56f7eafba79d50';
        const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${18}`
        try{
            let data = await fetch(apiUrl)
            let response = await data.json();
            setDrama(response.results)
            setLengths(response.results.length)

        }catch(error){
            console.log(error)
        }
    }
    DramaMovies()

   },[])

   const setCarousal = (type)=>{
    let DramaWidth = singleDrama.current.clientWidth;
    if(type==="next"){
        DramaCarousal.current.style.transform = `translateX(${card - DramaWidth - 60}px)`
        if(index<lengths-2){
            setCard(card - DramaWidth-60)
            setIndex(index +1)
        }

    } else if(type==="prev"){
        DramaCarousal.current.style.transform = `translateX(${card + DramaWidth + 60}px)`
        if(index>0){
            setCard(card + DramaWidth+60)
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
   <div className='mainDrama'>
    <h1>Drama</h1>
    <div className='Drama' ref={DramaCarousal}>
    {
        Dramas.map((an,key)=>{
            return (
                <>
                <div className='DramaMovies' key={key} ref={singleDrama}>
                <img src={`https://image.tmdb.org/t/p/original${an.poster_path}`} />  
                {/* {informations(a)}    */}
                </div>
                </>
            )
        })
    }
    </div>
    <div className='DramaButtons'>
    <button className='leftDrama' onClick={()=>setCarousal("prev")} disabled={index===0}><FaChevronLeft /></button>
    <button className='rightDrama' onClick={()=>setCarousal("next")} disabled={index === lengths - 9}  ><FaChevronRight/></button>
    </div>
    
    </div>
   </>
  )
}

export default Drama
