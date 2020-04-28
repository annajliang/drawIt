import React, { Component } from 'react';
import Guess from './Guess'
import Gallery from './Gallery'
import App from "../App";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Navbar extends Component {
    render() {
        return(
            <Router>
                <nav>
                    <ul className="navbarLinks">
                        <li>
                            <Link to="/app" className="home">Home</Link>
                            <Route path="/app" component={App} />
                        </li>
                        <li>
                            <Link to="/gallery">Gallery</Link>
                            <Route path="/gallery" component={Gallery} />
                        </li>
                        <li>
                            <Link to="/guess">Guess</Link>
                            <Route path="/guess" component={Guess} />
                        </li>
                    </ul>
                </nav>
            </Router>
        )
    }
}

export default Navbar;