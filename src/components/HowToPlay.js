import React, { Component } from 'react';

class HowToPlay extends Component {
    render() {
        return (
            <ul className="howToPlay">
                <h3>how to play</h3>
                <li>Draw the word that appears at the very top of the canvas.</li>
                <li>Click the buttons at the left-hand side if you wish to change colors, erase parts of your drawing or redo the entire thing.</li>
                <li>Once you are happy with your creation, click save to share your masterpiece with the world.</li>
            </ul>
        )
    }
}

export default HowToPlay;