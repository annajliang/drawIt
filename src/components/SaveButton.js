import React from "react";
import save from "../assets/nounSave.svg";

// receive props from parent Buttons.js component (which Buttons.js receives from Canvas.js)
const SaveButton = (props) => {
  return (
    // calls the saveDrawing function that lives in the parent component Canvas.js
    <button onClick={!props.disabled ? props.saveFn : props.checkSaveFn } className="canvasButton" aria-label="change color">
      <span className="showText">
        Save<span aria-hidden="true">&ensp;|&ensp;</span>
        {/* Save by Kevin White from the Noun Project */}
        <img src={save} alt=""></img>
      </span>
    </button>
  );
};

export default SaveButton;
