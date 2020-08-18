import React from "react";
import ColorButton from "./ColorButton";
import ClearButton from "./ClearButton";
import SaveButton from "./SaveButton";
import NextWordButton from "./NextWordButton";
import StrokeButton from './StrokeButton';

const Buttons = (props) => {
    // console.log(props);
    return (
        <div className="buttonContainer">
            {/* function props that are passed from the parent component of Canvas.js to its child 
            Buttons.js and then to each of Buttons.js' respective child components */}
            <ColorButton colorFn={props.colorFn} />
            <ClearButton clearFn={props.clearFn} />
            <NextWordButton nextWordFn={props.nextWordFn} />
            <SaveButton saveFn={props.saveFn} checkSaveFn={props.checkSaveFn} disabled={props.disabled} />
            <StrokeButton strokeFn={props.strokeFn} />
        </div>
    );
};

export default Buttons;
