import React, { Component } from 'react';
import firebase from "./../firebase";
import save from '../assets/nounSave.svg';

// get the drawingURL from the parent Canvas component as a prop
// push the drawingURL into the database
// shows a confirmation that the drawing was posted

class SaveButton extends Component {

    pushToDb = () => {
        // database reference
        const dbRef = firebase.database().ref();

    }

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