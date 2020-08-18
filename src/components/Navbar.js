import React from "react";
import InstructionsModal from "./InstructionsModal"
import { Link } from "react-router-dom";

const Navbar = (props) => {
    return (
        <nav>
            <h1>Draw It</h1>
            <span aria-hidden="true" className="divider">|</span>
             <ul className="navbarLinks">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/" className="instructionsLink" onClick={InstructionsModal}>Instructions</Link>
                </li>
                <li>
                    <Link to="/gallery">Gallery</Link>
                </li>
                <li>
                    <Link to={`/guess/${props.randomDrawingObj.drawingId}`} onClick={props.onClick}>Guess</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
