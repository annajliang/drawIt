import React, { Component } from "react";

class ColorButton extends Component {
  // function that gets the hexcolor from the type of color attribute of the input element
  getHexColor = (e) => {
    const hexColor = e.currentTarget.value;
    // variable is passed back up from ColorButton.js -> Buttons.js -> Canvas.js
    this.props.onClick(hexColor);
  };

  render() {
    return (
      // calls the changeColor function that lives in the parent component Canvas.js
      <button onClick={this.props.onClick} className="canvasButton">
        <span className="buttonText">
          <label htmlFor="colorSelection">
            Color<span aria-hidden="true">&ensp;|&ensp;</span>
          </label>
          <input
            name="colorSelection"
            id="colorSelection"
            type="color"
            className="colorSelection"
            // input element listens for a change
            onChange={this.getHexColor}
          />
        </span>
      </button>
    );
  }
}

export default ColorButton;
