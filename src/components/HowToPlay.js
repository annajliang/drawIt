import React, { Component } from 'react';

class HowToPlay extends Component {
    render() {
        return (
            <ul className="howToPlay">
                <h4>how to play</h4>
                <li>Draw the word that appears at the very top of the canvas.</li>
                <li>Click the buttons at the left-hand side to change colors, erase parts of your drawing or redo the entire thing.</li>
                <li>Once you are happy with your creation, click save to post it to gallery and share it with the world.</li>
                <li>Visit the gallery to guess what other users drew.</li>
            </ul>
        )
    }
}

export default HowToPlay;