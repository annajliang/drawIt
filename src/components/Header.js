import React, { Component } from 'react';
import Navbar from './Navbar';

class Header extends Component {
    render () {
        return (
            <header>
                <div className="wrapper">
                    <Navbar />
                    <h1>draw it <span role="img" alt="" aria-label="">✏️</span></h1>
                </div>
            </header>
        )
    }
}

export default Header;