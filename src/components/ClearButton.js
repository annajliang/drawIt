import React from "react";
import redo from "../assets/nounRedo.svg";

// receive props from parent Buttons.js component (which Buttons.js receives from Canvas.js)
const ClearButton = (props) => {
    return (
      // calls the clearCanvas function that lives in the parent component Canvas.js
      <button onClick={props.onClick} className="canvasButton">
        <span className="showText">
          Clear<span aria-hidden="true">&ensp;|&ensp;</span>
          <img src={redo} alt=""></img>
        </span>
      </button>
    );
};

export default ClearButton;
