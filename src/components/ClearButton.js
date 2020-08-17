import React from "react";
import clear from "../assets/nounRedo.svg";

// receive props from parent Buttons.js component (which Buttons.js receives from Canvas.js)
const ClearButton = (props) => {
    return (
      // calls the clearCanvas function that lives in the parent component Canvas.js
      <button onClick={props.clearFn} className="canvasButton" aria-label="clear canvas">
        <span className="showText">
          Clear<span aria-hidden="true">&ensp;|&ensp;</span>
          {/* clear by Mert Güler from the Noun Project */}
          <img src={clear} alt="" className="clearImg"></img>
        </span>
      </button>
    );
};

export default ClearButton;
