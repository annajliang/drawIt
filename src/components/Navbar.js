import React, { Component } from 'react';
import { Link } from "react-router-dom";
// import Guess from './Guess'
// import Gallery from './Gallery'
// import App from "../App";

class Navbar extends Component {
    render() {
        return(
            <>
                <nav>
                    <ul className="navbarLinks">
                        <li>
                            <Link to="/" className="home">Home</Link>
                            {/* <Route path="/app" component={App} /> */}
                        </li>
                        <li>
                            <Link to="/gallery">Gallery</Link>
                            {/* <Route path="/gallery" component={Gallery} /> */}
                        </li>
                        <li>
                            <Link to="/guess">Guess</Link>
                            {/* <Route path="/guess" component={Guess} /> */}
                        </li>
                    </ul>
                </nav>
            </>
        )
    }
}

export default Navbar;