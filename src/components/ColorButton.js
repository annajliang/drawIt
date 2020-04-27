import React, { Component } from 'react';

class ColorButton extends Component {

    getHexColor = (e) => {
        console.log(e);
        const hexColor = e.currentTarget.value;
        this.props.onClick(hexColor);
    }

    render() {
        return(
            <button onClick={this.props.onClick}>
                <span className="buttonText">Color
                <span className="divider"> | </span>
                <input name="colorSelection" type="color" className="colorSelection" onChange={this.getHexColor}/>
                </span>
            </button>   
        )
    }
}

export default ColorButton;