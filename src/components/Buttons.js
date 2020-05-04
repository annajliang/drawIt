import React from "react";
import ColorButton from "./ColorButton";
import ClearButton from "./ClearButton";
import SaveButton from "./SaveButton";
import NextWordButton from "./NextWordButton";

const Buttons = (props) => {
    return (
        <div className="buttonContainer">
            {/* function props that are passed from the parent component of Canvas.js to its child 
            Buttons.js and then to each of Buttons.js' respective child components */}
            <ColorButton onClick={props.colorFn} />
            <ClearButton onClick={props.clearFn} />
            <NextWordButton onClick={props.nextWordFn} />
            <SaveButton onClick={props.saveFn} />
        </div>
    );
};

export default Buttons;
