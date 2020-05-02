import React, { Component } from "react";
import Navbar from "./Navbar";

// const Header = () => {
//     return (
//         <header>
//             <div className="testing wrapper">
//                 <Navbar />
//             </div>
//         </header>
//     );
// };

class Header extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         drawingsArrFromApp: []
    //     }
    // }

    render() {
        // console.log('props header', this.props)
        return(
            <header>
                <div className="testing wrapper">
                    <Navbar randomDrawingObj={this.props.randomDrawingObj} onClick={this.props.getRandomId}/>
                </div>
            </header>         
        )
    }
}

export default Header;
