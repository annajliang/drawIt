import React, { Component } from 'react';
import save from '../assets/nounSave.svg';

class SaveButton extends Component {
    render() {
        return(
            <button>
                <span className="buttonText">Save  |  <img src={save} alt=''></img></span>
            </button>
        )
    }
}

export default SaveButton;