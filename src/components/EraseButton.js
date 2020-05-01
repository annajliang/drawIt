import React from 'react';
import erase from '../assets/nounErase.svg';

const EraseButton = (props) => {
  return (
    <button onClick={props.onClick} className="canvasButton">
      <span className="buttonText">
        Erase  |  <img src={erase} alt=""></img>
      </span>
    </button>
  ); 
}

export default EraseButton;