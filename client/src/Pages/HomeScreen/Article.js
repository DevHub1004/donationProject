import React from 'react'
import "./style.css"
import video from "./../../Assets/mov_bbb.mp4"

const vidUrl = "./../Assets/mov_bbb.mp4"

const Article = () => {
  return (
    <div className='articleBox'>
        <video width="300" height="200" controls autoPlay>
            <source src={video} type="video/mp4"/>
        </video>
        <div className='rightBox'>
            <h5>Title</h5>
            <pre>Description:- cousin pace chauvinist trouble lighter pot shave lamp original visit island whole get detail torture attic sin countryside ministry fitness feedback excitement premium look bare language offender monarch left weakness</pre>
            <p>Person Name</p>
        </div>
    </div>
  )
}

export default Article