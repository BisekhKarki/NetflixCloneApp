import React, { useEffect, useRef, useState } from 'react'
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
// import { BsFillPlayCircleFill } from "react-icons/bs";
// import { FiPlusCircle } from "react-icons/fi";
// import { AiFillLike } from "react-icons/ai";
// import { FaCircleChevronDown } from "react-icons/fa6";
// import { AiFillDislike } from "react-icons/ai";
import "../assets/style/Action.css"


const Action = () => {


    const [action,setAction] = useState([])
    let [lengths,setLengths] = useState(0)
    let singleAction = useRef();
    let actionCarousal = useRef();
    let [card,setCard] = useState(0)
    let [index,setIndex] = useState(0) 
    
   useEffect(()=>{
    const actionMovies = async ()=>{
        const apiKey ='28ebe13d95487c508f56f7eafba79d50';
        const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${28}`
        try{
            let data = await fetch(apiUrl)
            let response = await data.json();
            setAction(response.results)
            setLengths(response.results.length)

        }catch(error){
            console.log(error)
        }
    }
    actionMovies()

   },[])

   const setCarousal = (type)=>{
    let actionWidth = singleAction.current.clientWidth;
    if(type==="next"){
        actionCarousal.current.style.transform = `translateX(${card - actionWidth - 60}px)`
        if(index<lengths-2){
            setCard(card - actionWidth-60)
            setIndex(index +1)
        }

    } else if(type==="prev"){
        actionCarousal.current.style.transform = `translateX(${card + actionWidth + 60}px)`
        if(index>0){
            setCard(card + actionWidth+60)
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
   <div className='mainAction'>
    <h1>Action</h1>
    <div className='action' ref={actionCarousal}>
    {
        action.map((a,key)=>{
            return (
                <>
                <div className='actionMovies' key={key} ref={singleAction}>
                <img src={`https://image.tmdb.org/t/p/original${a.poster_path}`} />  
                {/* {informations(a)}    */}
                </div>
                </>
            )
        })
    }
    </div>
    <div className='actionButtons'>
    <button className='leftAction' onClick={()=>setCarousal("prev")} disabled={index===0}><FaChevronLeft /></button>
    <button className='rightAction' onClick={()=>setCarousal("next")} disabled={index === lengths - 9}  ><FaChevronRight/></button>
    </div>
    
    </div>
   </>
  )
}

export default Action
