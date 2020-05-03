import React from "react";
import ColorButton from "./ColorButton";
import EraseButton from "./EraseButton";
import ClearButton from "./ClearButton";
import SaveButton from "./SaveButton";

const Buttons = (props) => {
    return (
        <div className="buttonContainer">
            {/* function props that are passed from the parent component of Canvas.js to its child 
            Buttons.js and then to each of Buttons.js' respective child components */}
            <ColorButton onClick={props.colorFn} />
            <EraseButton onClick={props.eraseFn} />
            <ClearButton onClick={props.clearFn} />
            <SaveButton onClick={props.saveFn} />
        </div>
    );
};

export default Buttons;
