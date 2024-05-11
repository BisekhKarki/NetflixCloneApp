import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import { keyboard } from '@testing-library/user-event/dist/keyboard';
import "../assets/style/Tv.css"

const TvShows = () => {
    const [tvShows,setTvShows] = useState([]);
    const [tvLength,setTvLength] = useState(0)
    
    
    useEffect(()=>{
        // let randomNumber = Math.floor(Math.random()*20)
        // console.log(randomNumber)
        const tv = async ()=>{
            const apiKey ='28ebe13d95487c508f56f7eafba79d50';
            const movieLists = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&page=${9}`
            try{
                let tvData = await fetch(movieLists);
                let response = await tvData.json();
                setTvLength(response.results.length)
                setTvShows(response.results)
            
            }catch(error){
                console.log(error);
            }
        }
        tv()

    },[])


    

  return (
    <div style={{background:"black",marginBottom:"2x"}}>
        <Nav />
        <div className='tv'>
         {
            tvShows.map((t,key)=>{
                return(
                    <>
                    <div className='showTV'>
                    {/* <FaHeart  className='unlike' onClick={()=>removeItem(a)}/> */}
                    <img src={`https://image.tmdb.org/t/p/original${t.poster_path}`} alt={`Poster ${key}`} className='' />
                    </div>
                    </>
                )
            })
         }
        </div>
      
    </div>
  )
}

export default TvShows
