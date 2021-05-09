import React from 'react'
import video from './rain.mp4'

import './videoHeader.css'

const VideoHeader = () => {
    return (
        <>
           <div className="video-header">
           <video autoPlay={true} muted loop id="myVideo" style={{width:'100%'}}>
            <source src={video} type="video/mp4"/>
            </video>
            </div> 
        </>
    )
}

export default VideoHeader
