import React from 'react'
import './Obstacles.css'

//images
import Obstacle1 from '../../../../assets/images/obstacle1.png'
import Obstacle2 from '../../../../assets/images/obstacle2.png'
import Obstacle3 from '../../../../assets/images/obstacle3.png'
import Obstacle4 from '../../../../assets/images/obstacle4.png'
import Obstacle5 from '../../../../assets/images/obstacle5.png'
import Obstacle6 from '../../../../assets/images/obstacle6.png'
import Obstacle7 from '../../../../assets/images/obstacle7.png'
import Obstacle8 from '../../../../assets/images/obstacle8.png'

export default function Obstacles(props) {
    const RANDOMELEMENT = [Obstacle1, Obstacle2, Obstacle3, Obstacle4, Obstacle5, Obstacle6, Obstacle7, Obstacle8]

    return (
        <div className={props.class} style={{
            backgroundImage: `url(${RANDOMELEMENT[props.img]})`,
            bottom: `${props.y}px`,
            left: `${props.x}px`
        }} ></div>
    )
}
