import React, { Component } from 'react';
import erase from '../assets/nounErase.svg';

class EraseButton extends Component {
    render() {
        return(
            <button onClick={this.props.onClick}>
                <span className="buttonText">Erase
                <span className="divider"> | </span> 
                <img src={erase} alt=''></img>
                </span>
            </button>
        )
    }
}

export default EraseButton;