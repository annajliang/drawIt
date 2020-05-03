import React, { Component } from "react";
import Navbar from "./Navbar";

class Header extends Component {
    render() {
        return(
            <header>
                <div className="navbarContainer wrapper">
                    {/* props from App.js being passed to Header.js and then to Navbar.js */}
                    <Navbar randomDrawingObj={this.props.randomDrawingObj} onClick={this.props.getRandomId}/>
                </div>
            </header>         
        )
    }
}

export default Header;
