import React from "react";
import swal from "@sweetalert/with-react";

const InstructionsModal = () => {
    // instructionsModal only appears on smaller screen widths
    swal(
        <ul className="howToPlayModal">
            <h4>How to play</h4>
            <li>Draw the word that appears at the very top of the canvas.</li>
            <li>
                Use the buttons on the far left to change colors, clear the
                canvas or get a different word to draw.
            </li>
            <li>
                Once you're ready, click save to post it to the gallery and share
                it with the entire world.
            </li>
            <li>
                Click gallery to see what other users drew or click guess to get a
                random drawing chosen for you.
            </li>
        </ul>
    );
}

export default InstructionsModal;
