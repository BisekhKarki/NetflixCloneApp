import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import { keyboard } from '@testing-library/user-event/dist/keyboard';
import "../assets/style/Movies.css"

const Movies = () => {
    const [Movies,setMovies] = useState([]);
    const [tvLength,setTvLength] = useState(0)
    
    
    useEffect(()=>{
        // let randomNumber = Math.floor(Math.random()*20)
        // console.log(randomNumber)
        const tv = async ()=>{
            const apiKey ='28ebe13d95487c508f56f7eafba79d50';
            const movieLists = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${2}`
            try{
                let tvData = await fetch(movieLists);
                let response = await tvData.json();
                setTvLength(response.results.length)
                setMovies(response.results)
            
            }catch(error){
                console.log(error);
            } 
        }
        tv()

    },[])


    

  return (
    <div style={{background:"black",marginBottom:"2x"}}>
        <Nav />
        <div className='m'>
         {
            Movies.map((t,key)=>{
                return(
                    <>
                    <div className='movie'>
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

export default Movies
