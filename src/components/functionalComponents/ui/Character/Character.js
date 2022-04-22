import React, { useState } from 'react'
import Sprite from '../../../../assets/images/character.png'
import Spritesheet from 'react-responsive-spritesheet';
import { properties } from '../../../../utils/properties'

export default function Character(props) {

  return (
    <Spritesheet
      className={'character'}
      image={Sprite}
      widthFrame={80}
      heightFrame={110}
      steps={4}
      fps={8}
      loop={true}
      direction={'forward'}
      autoplay={false}
      style={{
        height: "110px",
        width: "80px",
        position: "absolute",
        bottom: `${props.y}px`,
        left: `${props.x}px`,
        transform: 'translate(-50 %, -50 %)',
      }}
      getInstance={spritesheet => {
        properties.jumpingAnimation = spritesheet
      }} />
  )

}


/* style={{
       height: "110px",
       width: "80px",
       position: "absolute",
       bottom: `${props.y}px`,
       left: `${props.x}px`,
       transform: 'translate(-50 %, -50 %)',
     }} */

/* className = {`my-element__class--style`}

 */

/* let style = {
  height: "110px",
  width: "80px",
  position: "absolute",
  bottom: `${props.y}px`,
  left: `${props.x}px`,
  transform: 'translate(-50 %, -50 %)',
  background: `url(${Sprite}) left center`,
  backgroundSize: 'cover'

}
function characterJump() {
}
return (
  <div className={`character ${props.class}`} onClick={characterJump} style={style}></div>
) */