import React, { Component } from 'react';
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
                            <Link to="/gallery" className="home">Gallery</Link>
                            <Route path="/gallery" component={Gallery} />
                        </li>
                        <li>
                            <Link to="/gallery" className="home">Guess</Link>
                        </li>
                    </ul>
                </nav>
            </Router>
        )
    }
}

export default Navbar;