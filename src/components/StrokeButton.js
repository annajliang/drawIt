import React, { Component } from "react";

class StrokeButton extends Component {
    constructor() {
        super();
        this.state = {
            value: 1,
        };
    }
    
    adjustStrokeWidth = (e) => {
        const strokeWidth = e.target.value;
        this.setState({ value: strokeWidth });
        this.props.strokeFn(strokeWidth);
    }

    render() {
        return (
            <button className="canvasButton">
                <input
                    className="slider"
                    type="range"
                    min="1"
                    max="50"
                    id="slider"
                    value={this.state.value}
                    onChange={this.adjustStrokeWidth} />
                <span class="sr-only">Adjust Stroke Size</span>
            </button>
        )
    }
}

export default StrokeButton;