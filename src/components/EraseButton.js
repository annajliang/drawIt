import React from "react";
import erase from "../assets/nounErase.svg";

// receive props from parent Buttons.js component (which Buttons.js receives from Canvas.js)
const EraseButton = (props) => {
  return (
    // calls the eraseCanvas function that lives in the parent component Canvas.js
    <button onClick={props.onClick} className="canvasButton">
      <span className="buttonText">
        Erase<span aria-hidden="true">&ensp;|&ensp;</span>
        <img src={erase} alt=""></img>
      </span>
    </button>
  );
};

export default EraseButton;
