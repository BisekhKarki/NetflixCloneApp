import React, { useEffect, useRef, useState } from 'react'
// import { BsFillPlayCircleFill } from "react-icons/bs";
// import { FiPlusCircle } from "react-icons/fi";
// import { AiFillLike } from "react-icons/ai";
// import { FaCircleChevronDown } from "react-icons/fa6";
// import { AiFillDislike } from "react-icons/ai";
import "../assets/style/TopRated.css"
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

const TopRated = () => {

  const [top,setTop] = useState([])
  let [lengths,setLengths] = useState(0)
  let singletop = useRef();
  let topCarousal = useRef();
  let [card,setCard] = useState(0)
  let [index,setIndex] = useState(0) 
  
 useEffect(()=>{
  const topMovies = async ()=>{
      const apiKey ='28ebe13d95487c508f56f7eafba79d50';
      const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
      try{
          let data = await fetch(apiUrl)
          let response = await data.json();
          setTop(response.results)
          setLengths(response.results.length)

      }catch(error){
          console.log(error)
      }
  }
  topMovies()

 },[])

 const setCarousal = (type)=>{
  let topWidth = singletop.current.clientWidth;
  if(type==="next"){
      topCarousal.current.style.transform = `translateX(${card - topWidth - 60}px)`
      if(index<lengths-2){
          setCard(card - topWidth-60)
          setIndex(index +1)
      }

  } else if(type==="prev"){
      topCarousal.current.style.transform = `translateX(${card + topWidth + 60}px)`
      if(index>0){
          setCard(card + topWidth+60)
          setIndex(index-1)
      }
  }


 }

//  const titleShow = (t)=>{
//   if(t.title && t.title !== ""){
//       return <h3>{t.title}</h3>
//   } else if (t.name && t.name !== ""){
//       return <h3>{t.name}</h3>
//   }else {
//       return <h3>No titles available</h3>
//   }
//  }


// const informations = (values)=>{

//       return(
//           <div className='informations'>
//           <div className='infoButton'>
//             <div className='leftButton'>
//             <BsFillPlayCircleFill className='playButton'/>
//             <FiPlusCircle />
//             < AiFillLike />
//             <AiFillDislike />
//             </div>
//             <div className='rightButton'>
//               <FaCircleChevronDown  />
//             </div>
//           </div>
//           <div className='titleAndOther'>
//             {titleShow(values)}
//             <p className='rating'>Rating: {values.vote_average}</p>
//             <p className='type'>Release Date: {values.release_date}</p>
//           </div>
//         </div>
//       )
//   }


    const showBigScreen = (val)=>{
        console.log(val)
    }
  return (
    <>
  <div className='top'>
    <h1>Top Rated</h1>
    <div className='topMovies' ref={topCarousal}>
      {
        top.map((c,key)=>{
          return(
            <>
            <div className='t' key={key} ref={singletop}>
            <img src={`https://image.tmdb.org/t/p/original${c.poster_path}`} className='poster'  />
            {/* {informations(c)} */}
            </div>
            </>
          )
        })
      }
    </div>
    <button className='leftTop' onClick={()=> setCarousal("prev")} disabled={index===0} ><FaChevronLeft /></button>
    <button className='rightTop' onClick={()=>setCarousal("next")} disabled={index=== lengths-9}><FaChevronRight/></button>
   </div>

    </>
  )
}

export default TopRated
