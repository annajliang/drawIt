import React, { Component } from 'react';
import Navbar from "./Navbar";

class Header extends Component {
    render() {
        return (
            <header>
                <div className="testing wrapper">
                    <Navbar />
                </div>
            </header>
        )
    }
}

export default Header;