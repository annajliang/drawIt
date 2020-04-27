import React, { Component } from 'react';
import redo from '../assets/nounRedo.svg';

class ClearButton extends Component {
    render() {
        return(
            <button onClick={this.props.onClick}>
                <span className="buttonText">Clear 
                <span className="divider"> | </span> 
                <img src={redo} alt=''></img></span>
            </button>
        )
    }
}

export default ClearButton;