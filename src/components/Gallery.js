import React, { Component } from 'react';

class Gallery extends Component {
    constructor() {
        super();
        this.state = {
            drawings: []
        }
    }

    render() {
        return(
            <div className="galleryGrid">
                <ul className="gallery">
                    <li className="userDrawing"></li>
                </ul>
                <p>This is some dummy text.</p>
            </div>
        )
    }
}

export default Gallery;