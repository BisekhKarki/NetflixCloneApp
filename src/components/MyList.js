import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import "../components/MyList.css"
import NoData from './NoData';
import { FaHeart } from "react-icons/fa";

const MyList = () => {
  const [arr, setArr] = useState([]);
//   console.log(arr)

  useEffect(() => {
    const homeDatas = localStorage.getItem('Movies');
    const parsedHome = JSON.parse(homeDatas);
    setArr(parsedHome);
  }, []);

  const removeItem = (ab)=>{
    const updatedArr = arr.filter(item => item !== ab);
    setArr(updatedArr);
    localStorage.setItem('Movies', JSON.stringify(updatedArr)); 
  }

  return (
    <>
      <div className='listMy'>
        <Nav />
         {arr===null ? <NoData /> : 
        <div className='myList'>
          {arr.map((a, key) => (
            <div key={key}>
                <FaHeart  className='unlike' onClick={()=>removeItem(a)}/>
              <img src={`https://image.tmdb.org/t/p/original${a.poster_path}`} alt={`Poster ${key}`} className='' />
            </div>
          ))}
        </div>}
      </div>
    </>
  );
};

export default MyList;
