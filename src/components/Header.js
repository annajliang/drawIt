import React from "react";
import Navbar from "./Navbar";

const Header = (props) => {
    return (
        <header>
            <div className="navbarContainer wrapper">
                {/* props from App.js being passed to Header.js and then to Navbar.js */}
                <Navbar randomDrawingObj={props.randomDrawingObj} onClick={props.getRandomId} />
            </div>
        </header>
    )
}

export default Header;
