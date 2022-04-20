import React from 'react'
import Sprite from '../../../../assets/images/character.png'
import styled, { keyframes } from 'styled-components'

const animation = keyframes`
  100% { background-position: -1000px; }
`;

const SpriteCharacter = styled.div`
    height: 160px;
    width: 97px;
  position: absolute;
 
  bottom: ${props => props.y}px;
  left: ${props => props.x}px;
  transform: translate(-50%, -50%);
  background: url(${Sprite}) left center;
  animation: ${animation} .6s steps(4) ; 
`;

export default SpriteCharacter
