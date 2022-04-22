import React, { useState } from 'react'
import Sprite from '../../../../assets/images/character.png'
import styled, { keyframes } from 'styled-components'



export default function Character(props) {

  let style = {
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
    <div className='character' onClick={characterJump} style={style}></div>
  )
}



/* const animation = keyframes`
  100% { background-position: -1000px; }
`;

const SpriteCharacter = styled.div`
    height: 160px;
       width: 120px;
  position: absolute;
 
  bottom: ${props => props.y}px;
  left: ${props => props.x}px;
  transform: translate(-50%, -50%);
  background: url(${Sprite}) left center;
  animation: ${animation} 0.7s steps(4) infinite; 
`;

export default SpriteCharacter
 */