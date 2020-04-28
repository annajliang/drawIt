import React, { Component } from 'react';
import firebase from "./../firebase";
import save from '../assets/nounSave.svg';

class SaveButton extends Component {
    render() {
        console.log(firebase);
        return(
            <button onClick={this.props.onClick}>
                <span className="buttonText">Save  |  <img src={save} alt=''></img></span>
            </button>
        )
    }
}

export default SaveButton;