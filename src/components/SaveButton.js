import React from "react";
import save from "../assets/nounSave.svg";

// receive props from parent Buttons.js component (which Buttons.js receives from Canvas.js)
const SaveButton = (props) => {
  return (
    // calls the saveDrawing function that lives in the parent component Canvas.js
    <button onClick={props.onClick} className="canvasButton">
      <span className="showText">
        Save<span aria-hidden="true">&ensp;|&ensp;</span>
        <img src={save} alt=""></img>
      </span>
    </button>
  );
};

export default SaveButton;
