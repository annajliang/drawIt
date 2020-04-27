import React, { Component } from 'react';
import ColorButton from './ColorButton';
import EraseButton from './EraseButton';
import ClearButton from './ClearButton';
import SaveButton from './SaveButton';

class Buttons extends Component {

    //  onButtonClick = (color) => {
    //     console.log(color)
    //     this.ctx.strokeStyle = color;
    // }


    render () {
        return (
            <div className="buttonContainer">
                <ColorButton onClick={this.props.colorFn} />
                <EraseButton onClick={this.props.eraseFn} />
                <ClearButton onClick={this.props.clearFn} />
                <SaveButton />
            </div>
        )
    }
}

export default Buttons;