import React, { useEffect, useRef, useState } from 'react'
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
// import { BsFillPlayCircleFill } from "react-icons/bs";
// import { FiPlusCircle } from "react-icons/fi";
// import { AiFillLike } from "react-icons/ai";
// import { FaCircleChevronDown } from "react-icons/fa6";
// import { AiFillDislike } from "react-icons/ai";
import "../assets/style/Comedy.css";

const Comedies = () => {
 
  const [comedies,setComedies] = useState([])
  const [comediesLength,setComediesLength] = useState(0)
  let [index,setIndex] = useState(0)
  let [card,setCard] = useState(0)
  let singleComedies = useRef();
  let comediesCarousal = useRef();



  useEffect(()=>{
    const movies = async ()=>{
      const apiKey ='28ebe13d95487c508f56f7eafba79d50';
      const lists = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${35}`
      try{
          let movieData = await fetch(lists);
          let response = await movieData.json();
          setComediesLength(response.results.length)
          setComedies(response.results)
      
      }catch(error){
          console.log(error);
      }
    }

    movies()
  },[])

  const move = (type)=>{
  let comediesWidth = singleComedies.current.clientWidth;
  if(type==="next"){
    comediesCarousal.current.style.transform = `translateX(${card - comediesWidth - 60}px)`
    if(index<comediesLength-2){
      setCard(card - comediesWidth - 60);
      setIndex(index + 1)
    }
  }else if(type==="prev"){
    comediesCarousal.current.style.transform = `translateX(${card + comediesWidth + 60}px)`
    if(index>0){
      setCard(card + comediesWidth + 60);
      setIndex(index - 1)
    }
  }
  }


//   const titleShow = (t)=>{
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
   <div className='comedies'>
    <h1>Comedies</h1>
    <div className='comediesMovies' ref={comediesCarousal}>
      {
        comedies.map((c,key)=>{
          return(
            <>
            <div className='co' key={key} ref={singleComedies}>
            <img src={`https://image.tmdb.org/t/p/original${c.poster_path}`} className='poster'  />
            {/* {informations(c)} */}
            </div>
            </>
          )
        })
      }
    </div>
    <button className='leftC' onClick={()=> move("prev")} disabled={index===0} ><FaChevronLeft /></button>
    <button className='rightC' onClick={()=>move("next")} disabled={index=== comediesLength-9}><FaChevronRight/></button>
   </div>


    </>
  )
}

export default Comedies
