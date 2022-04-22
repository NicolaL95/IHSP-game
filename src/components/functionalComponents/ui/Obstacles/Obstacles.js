import React from 'react'
import './Obstacles.css'

//images
import Obstacle1 from '../../../../assets/images/obstacle1.png'
import Obstacle2 from '../../../../assets/images/obstacle2.png'
import Obstacle3 from '../../../../assets/images/obstacle3.png'
import Obstacle4 from '../../../../assets/images/obstacle4.png'

export default function Obstacles(props) {
    const RANDOMELEMENT = [Obstacle1, Obstacle2, Obstacle3, Obstacle4]

    return (
        <div className='obstacles_container' style={{
            backgroundImage: `url(${RANDOMELEMENT[props.img]})`,
            bottom: `${props.y}px`,
            left: `${props.x}px`
        }} ></div>
    )
}
