import React, { useEffect, useRef, useState } from 'react'
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
// import { BsFillPlayCircleFill } from "react-icons/bs";
// import { FiPlusCircle } from "react-icons/fi";
// import { AiFillLike } from "react-icons/ai";
// import { FaCircleChevronDown } from "react-icons/fa6";
// import { AiFillDislike } from "react-icons/ai";
import "../assets/style/Animation.css"



const Animated = () => {


    const [Animations,setAnimation] = useState([])
    let [lengths,setLengths] = useState(0)
    let singleAnimation = useRef();
    let AnimationCarousal = useRef();
    let [card,setCard] = useState(0)
    let [index,setIndex] = useState(0) 
    
   useEffect(()=>{
    const AnimationMovies = async ()=>{
        const apiKey ='28ebe13d95487c508f56f7eafba79d50';
        const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${16}`
        try{
            let data = await fetch(apiUrl)
            let response = await data.json();
            setAnimation(response.results)
            setLengths(response.results.length)

        }catch(error){
            console.log(error)
        }
    }
    AnimationMovies()

   },[])

   const setCarousal = (type)=>{
    let AnimationWidth = singleAnimation.current.clientWidth;
    if(type==="next"){
        AnimationCarousal.current.style.transform = `translateX(${card - AnimationWidth - 60}px)`
        if(index<lengths-2){
            setCard(card - AnimationWidth-60)
            setIndex(index +1)
        }

    } else if(type==="prev"){
        AnimationCarousal.current.style.transform = `translateX(${card + AnimationWidth + 60}px)`
        if(index>0){
            setCard(card + AnimationWidth+60)
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
   <div className='mainAnimation'>
    <h1>Animated</h1>
    <div className='Animation' ref={AnimationCarousal}>
    {
        Animations.map((an,key)=>{
            return (
                <>
                <div className='AnimationMovies' key={key} ref={singleAnimation}>
                <img src={`https://image.tmdb.org/t/p/original${an.poster_path}`} />  
                {/* {informations(a)}    */}
                </div>
                </>
            )
        })
    }
    </div>
    <div className='AnimationButtons'>
    <button className='leftAnimation' onClick={()=>setCarousal("prev")} disabled={index===0}><FaChevronLeft /></button>
    <button className='rightAnimation' onClick={()=>setCarousal("next")} disabled={index === lengths - 9}  ><FaChevronRight/></button>
    </div>
    
    </div>
   </>
  )
}

export default Animated
