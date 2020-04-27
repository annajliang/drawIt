import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        return(
            <nav>
                <ul className="navbarLinks">
                    <li>
                        <a href="#">Home</a>
                    </li>
                    <li>
                        <a href="#">Gallery</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;