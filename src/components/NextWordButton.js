import React from "react";
import next from "../assets/nounNext.svg";

// receive props from parent Buttons.js component (which Buttons.js receives from Canvas.js)
const NextWordButton = (props) => {
    return (
      // calls the nextWord function that lives in the parent component Canvas.js
      <button onClick={props.nextWordFn} className="canvasButton" aria-label="get next drawing word">
        <span className="showText">
          Next<span aria-hidden="true">&ensp;|&ensp;</span>
          {/* Next by Deemak Daksina from the Noun Project */}
          <img src={next} alt="" className="nextImg"></img>
        </span>
      </button>
    );
};

export default NextWordButton;
