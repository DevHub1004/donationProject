import React, { useState } from 'react'
import Article from './Article'


const HomeScreen = () => {
  const [data,setData] = useState([",",",",""])
  return (
    <div className='HomePage'>
      <h1>Web site name</h1>
      {
        data.map((ele)=>{
          return(
            <Article/>
          )
        })
      }
      
    </div>
  )
}

export default HomeScreen