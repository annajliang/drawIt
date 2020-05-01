import React from "react";
import redo from "../assets/nounRedo.svg";

const ClearButton = (props) => {
    return (
        <button onClick={props.onClick} className="canvasButton">
            <span className="buttonText">
                Clear&ensp;|&ensp;<img src={redo} alt=""></img>
            </span>
        </button>
    );
};

export default ClearButton;
