import React from 'react';
import save from '../assets/nounSave.svg';

const SaveButton = (props) => {
  return (
    <button onClick={props.onClick} className="canvasButton">
      <span className="buttonText">
        Save  |  <img src={save} alt=""></img>
      </span>
    </button>
  );
}

export default SaveButton;