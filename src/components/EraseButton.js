import React, { Component } from 'react';
import erase from '../assets/nounErase.svg';

class EraseButton extends Component {
    render() {
        return (
          <button onClick={this.props.onClick} className="canvasButton">
            <span className="buttonText">
              Erase  |  <img src={erase} alt=""></img>
            </span>
          </button>
        );
    }
}

export default EraseButton;