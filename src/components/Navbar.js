import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Guess from './Guess'
// import Gallery from './Gallery'
// import App from "../App";

class Navbar extends Component {
    render() {
        return (
            <>
                <nav>
                    <h1>draw it</h1>
                    <span className="divider">|</span>
                    <ul className="navbarLinks">
                        <li>
                            <Link to="/">Home</Link>
                            {/* <span class="divider">|</span> */}
                        </li>
                        <li>
                            <Link to="/gallery">Gallery</Link>
                            {/* <span class="divider">|</span> */}
                        </li>
                        <li>
                            <Link to="/guess/-M636QQbPkJ7ezU310H-">Guess</Link>
                            {/* <span class="divider">|</span> */}
                        </li>
                    </ul>
                </nav>
            </>
        );
    }
}

export default Navbar;
