import React, { useEffect, useRef, useState } from 'react'
import { CgChevronRightO, CgChevronLeftO } from "react-icons/cg";



const Action = () => {


    const [actionMovies,setActionMovies] = useState([])
    let singleAction = useRef();
    let actionRef = useRef();


    useEffect(()=>{
        const actionMovies = async ()=>{
            let api_key = '28ebe13d95487c508f56f7eafba79d50';
            let url = ``



        }

    })
    


  return (
   <>
    <div className='mainContainer'>
    <div className='HeadingAndButton'>
    <p className='heading'>Action Movies</p>
            <div className='carouselButtons'>
            <button className='prev'><CgChevronLeftO /></button>
            <button className='next' ><CgChevronRightO /></button>
            </div>
    </div>
    <div className='actionMovies'>
        

    </div>

    </div>
   </>
  )
}

export default Action
