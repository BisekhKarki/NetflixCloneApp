  import React, { useEffect, useRef, useState } from 'react'
  import "../assets/style/Home.css"
  import { CgChevronRightO, CgChevronLeftO } from "react-icons/cg";
  import { BsFillPlayCircleFill } from "react-icons/bs";
  import { FiPlusCircle } from "react-icons/fi";
  import { AiFillLike } from "react-icons/ai";
  import { FaCircleChevronDown } from "react-icons/fa6";
  import { AiFillDislike } from "react-icons/ai";
import Horror from './Horror';
import Nav from '../components/Nav';
import Comedies from './Comedies';
import TopRated from './TopRated';

  const Home = () => {

    let carousel = useRef()
    let singleMovieRef = useRef()
    let [card,setCard] = useState(0)
    const [length,setLength] = useState(0);
    const [imageIndex,setImageIndex] = useState(0);
    const [lists,setLists] = useState([])

    useEffect(()=>{
      async function FavouriteMovies(){
        const apiKey = '28ebe13d95487c508f56f7eafba79d50';
        const lists = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${1}`
        try{
          let response = await fetch(lists)
          let data =await response.json();
          setLists(data.results);
          setLength(data.results.length);
        }catch(error){
          error.log(error)
        }
      }
      FavouriteMovies()

    },[ ])

    const onclick = (type)=>{
      let wdith = singleMovieRef.current.clientWidth;
      if(type==="next"){
        carousel.current.style.transform = `translateX(${card-wdith-60}px)`
        if(imageIndex < length -3){
          setImageIndex(imageIndex + 1)
          setCard(card-wdith-60);
        }
        
      } 
      else if(type==="previous"){
        carousel.current.style.transform = `translateX(${card+wdith+60}px)`
        if(imageIndex > 0){
          setImageIndex(imageIndex - 1)
          setCard(card+wdith+60);
        }
        
      } 
    }
    const titleShow = (item)=>{
      if(item.title && item.title!==" "){
        return <p className='title'>{item.title}</p>
      }else if(item.name && item.name !== ""){
        return <p className='title'>{item.name}</p>
      } else {
        return <p className='title'>No name availabe</p>
      }
    }

    

    return (
      <>
      <div>
        <Nav />
        <div className='mainContainer'>
        <div className='buttonAndHeading'>
          <p className='heading'>Popular On Netflix</p>
            <div className='carouselButtons'>
            <button onClick={()=> onclick("previous")} className='prev' disabled={imageIndex===0} ><CgChevronLeftO /></button>
            <button onClick={()=>onclick("next")} className='next' disabled={imageIndex === length-8}  ><CgChevronRightO /></button>
            </div>
        </div>
        
        <div className='moviesFetched' ref={carousel} > 
        {
          lists.map((items,key)=>{
            return(
              <>
              <div className='Popular' key={key} ref={singleMovieRef} >
              <img src={`https://image.tmdb.org/t/p/original${items.poster_path}`} />
              
              <div className='informations'>
                <div className='infoButton'>
                  <div className='leftButton'>
                  <BsFillPlayCircleFill className='playButton'/>
                  <FiPlusCircle />
                  < AiFillLike />
                  <AiFillDislike />
                  </div>
                  <div className='rightButton'>
                    <FaCircleChevronDown  />
                  </div>
                </div>
                <div className='titleAndOther'>
                  {titleShow(items)}
                  <p className='rating'>Rating: {items.vote_average}</p>
                  <p className='type'>Genre: {items.media_type}</p>
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
      <Horror />
      <Comedies />
      <TopRated />
      </>
    )
  }

  export default Home
