import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Guess from './Guess'
// import Gallery from './Gallery'
// import App from "../App";

class Navbar extends Component {
    constructor() {
        console.log('NAVBAR.JS i construct')
        super();
        this.state = {
            // drawingsArrFromHeader: [],
            idArray: []
        }
    }

    componentDidMount() {
        console.log('NAVBAR.JS i mounted');
    }

    // getAllIds = (drawingsArray) => {
    //     const ids = drawingsArray.map((drawingObj) => {
    //         return drawingObj;
    //     });

    //     if (ids.length > 0) {
    //         this.setState({
    //             idArray: ids,
    //         });
    //     }
    // };

    // deferredFunction = () => {
    //     this.getRandomWord(this.props.drawings);
    // }

    //everytime user clicks on GUESS link
    //the end of the url changes and a new ID is generated

    
    // getRandomWord = (array) => {
    //     return array[Math.floor(Math.random() * array.length)];
    // };
    

    render() {
        console.log('randomDrawingObj from navbar.js', this.props.randomDrawingObj)
        // console.log('length', this.props.drawings.length)
        console.log('NAVBAR.js i rendered')
       
        return (
            <>
                <nav>
                    <h1>Draw It</h1>
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
                            <Link to={`/guess/${this.props.randomDrawingObj.drawingId}`} onClick={this.props.onClick}>Guess</Link>
                            {/* <span class="divider">|</span> */}
                        </li>
                    </ul>
                </nav>
            </>
        );
    }
}

export default Navbar;
