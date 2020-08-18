import React from "react";

const ColorButton = (props) => {
    return (
      // calls the changeColor function that lives in the parent component Canvas.js
      <button onClick={props.colorFn} className="canvasButton" aria-label="change color">
        <span className="showText">
          <label htmlFor="colorSelection">
            Color<span aria-hidden="true">&ensp;|&ensp;</span>
          </label>
          <input
            name="colorSelection"
            id="colorSelection"
            type="color"
            className="colorSelection"
            // input element listens for a change
            // function that gets the hexcolor from the type attribute of the input element
            onChange={(e) => props.colorFn(e.currentTarget.value)}
          />
        </span>
      </button>
    );
}

export default ColorButton;
