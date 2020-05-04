import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from "@sweetalert/with-react";

class Navbar extends Component {
    // instructionsModal only appears on smaller screen widths
    instructionsModal = () => {
        swal(
          <ul class="howToPlayModal">
            <h4>How to play</h4>
            <li>Draw the word that appears at the very top of the canvas.</li>
            <li>
              Use the buttons on the far left to change colors, clear the
              canvas or get a different word to draw.
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

    render() {
        return (
            <>
                <nav>
                    <h1>Draw It</h1>
                    <span aria-hidden="true" className="divider">|</span>
                    <ul className="navbarLinks">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/" className="instructionsLink" onClick={this.instructionsModal}>Instructions</Link>
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
