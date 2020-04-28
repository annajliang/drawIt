import React, { Component } from 'react';
import firebase from "./../firebase";

class Gallery extends Component {
    constructor() {
        super();
        this.state = {
            drawings: []
        }
    }

    render() {
        return(
            <div className="gallery">
                <p>A collection of drawings done by other users around the globe! Can you guess the correct word?</p>
                <ul className="galleryGrid">
                    <li className="userDrawing">TEST</li>
                </ul>
            </div>
        )
    }
}

export default Gallery;