import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from "@sweetalert/with-react";

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            idArray: []
        }
    }

    sweetAlert = () => {
        swal(
          <ul class="howToPlayModal">
            <h4>how to play</h4>
            <li>Draw the word that appears at the very top of the canvas.</li>
            <li>
              Use the buttons near the canvas to erase, clear or change colors.
            </li>
            <li>
              Once you're ready, click save to post it to the gallery and share
              it with the entire world.
            </li>
            <li>
              Click gallery to see what other users drew or click guess to get a
              random drawing chosen for you.
            </li>
          </ul>
        );
    }

    handleClick = () => {
        console.log('click');
    }
    

    render() {
        console.log('randomDrawingObj from navbar.js', this.props.randomDrawingObj)
        // console.log('length', this.props.drawings.length)
        console.log('NAVBAR.js i rendered')
        return (
            <>
                <nav>
                    <h1>Draw It</h1>
                    <span className="divider">|</span>
                    <ul className="navbarLinks">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/" className="instructionsLink" onClick={this.sweetAlert}>Instructions</Link>
                        </li>
                        <li>
                            <Link to="/gallery">Gallery</Link>
                        </li>
                        <li>
                            <Link to={`/guess/${this.props.randomDrawingObj.drawingId}`} onClick={this.props.onClick}>Guess</Link>
                        </li>
                    </ul>
                </nav>
            </>
        );
    }
}

export default Navbar;
