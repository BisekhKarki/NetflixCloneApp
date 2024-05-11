import React, { useEffect, useRef, useState } from 'react'
import "../assets/style/Home.css"
import { FaPlay } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { FiPlusCircle } from "react-icons/fi";
import { AiFillLike } from "react-icons/ai";
import { FaCircleChevronDown } from "react-icons/fa6";
import { AiFillDislike } from "react-icons/ai";
import "../assets/style/Bigscreen.css"
import { ImCross } from "react-icons/im";

const Home = () => {
    const [data,setData] = useState([]);
    const [lengths,setLengths] = useState(0);
    const [movies,setMovies] = useState([])
    let [movieLength,setMovieLength] = useState(0)
    let singleCarousal = useRef();
    let movieCarousal = useRef();
    let [card,setCard] = useState(0)
    const [index,setIndex] = useState(0);
    const [bigScreen, setBigScreen] = useState([])
    const [showComp, setShowComp] = useState(false)
    const [localsData,setLocalsData] = useState([]);
    
   

    useEffect(()=>{
        const homeMovie = async ()=>{
            const apiKey ='28ebe13d95487c508f56f7eafba79d50';
            const lists = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${2}`
            try{
                let movieData = await fetch(lists);
                let response = await movieData.json();
                setLengths(response.results.length)
                let randomValue = Math.floor(Math.random() * response.results.length)
                setData(response.results[randomValue])
            
            }catch(error){
                console.log(error);
            }
        }
        homeMovie()

    },[])
    useEffect(()=>{
        const movie = async ()=>{
            const apiKey ='28ebe13d95487c508f56f7eafba79d50';
            const movieLists = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${1}`
            try{
                let movieData = await fetch(movieLists);
                let response = await movieData.json();
                setMovieLength(response.results.length)
                setMovies(response.results)
            
            }catch(error){
                console.log(error);
            }
        }
        movie()
    },[])

    
    const titleShow = (data)=>{
        if(data.title && data.title !== ""){
            return <h1 className='singleTitle'>{data.title}</h1>
        }else if (data.name && data.name !== ""){
            return <h1 className='singleTitle'>{data.name}</h1>
        }else {
            return <h1 className='singleTitle'>No title availabe</h1>
        }
    }


    const carousal = (types)=>{
        let moveWidth = singleCarousal.current.clientWidth;
        if(types==="next"){
            movieCarousal.current.style.transform = `translateX(${card - moveWidth - 60}px)`
            if(index<movieLength-2){
                setCard(card - moveWidth - 60);
                setIndex(index + 1)
            } 
        } else if(types==="prev"){
            movieCarousal.current.style.transform = `translateX(${card + moveWidth + 60}px)`
            if(index>0){
                setCard(card + moveWidth + 60);
                setIndex(index - 1)
            } 
        }
    }


    const showBigScreen = (items)=>{
        setBigScreen(items)
        setShowComp(!showComp)
        
    }

    const setToLocalStorage = (vala) => {
        const newData = [...localsData, vala];
        setLocalsData(newData)
        localStorage.setItem("Datas", JSON.stringify(newData));
    };
    
    

const informations = (values)=>{
        return(
            <>
             
            <div className='showBigScreen' style={{display: showComp ? "block": "none" }}>
            <ImCross className='wrong' onClick={()=>setShowComp(!showComp)} />
              <img src={`https://image.tmdb.org/t/p/original${values.poster_path}`} className='bigPoster'  />
              <div className='informations'>
            <div className='infoButton'>
              <div className='leftButton'>
              <BsFillPlayCircleFill className='playButton'/>
              <FiPlusCircle onClick={()=>setToLocalStorage(values)} />
              <AiFillLike />
              <AiFillDislike />
              </div>
              <div className='rightButton'>
                <FaCircleChevronDown   />
              </div>
            </div>
            <div className='titleAndOther'>
              {titleShow(values)}
              <p className='rating'>Rating: {values.vote_average}</p>
              <p className='type'>Release Date: {values.release_date}</p>
            </div>
          </div>
            </div>
            
            </>
            
        )
    }

  return (
    <>
    <div className='home' style={{backgroundImage:`url(https://image.tmdb.org/t/p/original${data.poster_path})`
        , backgroundPosition:"center", backgroundRepeat:"no-repeat", backgroundSize:"cover"}} >
            <div></div>
        <div className='singleData' style={{color:"white", background:"none"}} >
            {titleShow(data)}
            <p className='singleDescribe'>{data.overview}</p>
        </div>
        <div className='singleButtons'>
        <button className='playSingle'><FaPlay />Play</button>
        <button className='singleInfo'><IoMdInformationCircle />More Info</button>
        </div>
        <div className='moreDatas'>
            <h1 className='head'>Popular on Netflix</h1>
             <div className='homeMovies' ref={movieCarousal}>
            {
                movies.map((items,key)=>{
                    return(
                        <div className='movies' key={key} ref={singleCarousal}>
                        <img src={`https://image.tmdb.org/t/p/original${items.poster_path}`} className='poster' onClick={()=>showBigScreen(items)}  />
                       </div> 
                    )
                })
            }
            </div>
            <button className='leftHome' onClick={()=>carousal("prev")} disabled={index===0}  ><FaChevronLeft /></button>  
            <button className='right' onClick={()=>carousal("next")} disabled={index === movieLength -9}><FaChevronRight /></button>
            {informations(bigScreen)}
 
        </div>
    </div>
    
    </>
  )
}

export default Home
