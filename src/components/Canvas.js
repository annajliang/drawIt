import React, { Component } from "react";
import Buttons from "./Buttons";
import HowToPlay from "./HowToPlay";
import words from "../data/words";
import firebase from "../firebase";
import SweetAlert from "sweetalert2-react";
import forbiddenColors from "../data/forbiddenColors";

// thank you Dev Ed @ youtube.com/channel/UClb90NQQcskPUGDIXsQEz5Q for your tutorial on HTML5 Canvas

class Canvas extends Component {
  constructor() {
    super();
    // canvas element is an uncontrolled component so it handles updating the DOM for you (no need for it to be in state)
    this.isDrawing = false;
    // using ref to access the canvas element created in the render method
    // find the canvas element save it to a variable
    this.canvas = React.createRef();
    // inital states
    this.state = {
      drawingWord: "",
      showModal: false,
      modalText: "",
      modalHeader: "",
      height: 500,
      width: 450,
    };
  }

  // only runs once after the render
  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize.bind(this));

    // get a random drawing word from the words array in words.js and set it to state to get re-rendered on the page
    this.setState({
      drawingWord: this.getRandomWord(words),
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize.bind(this));
  }

  handleResize = () => {
    if (window.innerWidth > 525) {
      this.setState({ width: 450, height: 500 });
    } else if (window.innerWidth <= 525 && window.innerWidth > 471) {
      this.setState({ width: 400, height: 500 });
    } else if (window.innerWidth <= 471 && window.innerWidth > 412) {
      this.setState({ width: 350, height: 500 });
    } else if (window.innerWidth <= 412 && window.innerWidth > 374) {
      this.setState({ width: 320, height: 500 });
    } else if (window.innerWidth <= 374 && window.innerWidth > 350) {
      this.setState({ width: 300, height: 500 });
    } else if (window.innerWidth <= 350) {
      this.setState({ width: 275, height: 500 });
    }
  };

  // prepares drawing to start on mousedown
  startDrawing = (e) => {
    this.isDrawing = true;
    // allows user to also draw dots on the page on mousedown events instead of just lines with mousemoves events
    this.draw(e);

    if (e.type === "touchstart") {
      this.isDrawing = true;
      console.log("touchstart");
      const touch = e.touches[0];
      this.swipe = {
        x: touch.clientX,
        y: touch.clientY,
      };
    }
  };

  // draw lines as mouse moves
  draw = (e) => {
    this.ctx = this.canvas.current.getContext("2d");

    // width of the line
    this.ctx.lineWidth = 7;

    // ensures that we get a smooth drawing rather than a squared-off edge by default
    this.ctx.lineJoin = "round";
    this.ctx.lineCap = "round";

    // returns the size of the canvas element and its position relative to the viewport
    const pos = this.canvas.current.getBoundingClientRect();

    // console.log('pos', pos)
    let offsetX = pos.left;
    let offsetY = pos.top;
    let mouseX = parseInt(e.nativeEvent.clientX - offsetX);
    let mouseY = parseInt(e.nativeEvent.clientY - offsetY);

    // if the condition is true, then whatever the coordinates are for where the user chooses to place their mouse and begin drawing, form a continous line until the condition is false
    if (e.type === "mousemove" && this.isDrawing) {
      // we want the line to go to where the user's mouse is
      this.ctx.lineTo(mouseX, mouseY);
      // will form the lines
      this.ctx.stroke();
      // ensures that the line is continious
      this.ctx.beginPath();
      this.ctx.moveTo(mouseX, mouseY);
    } else if (e.type === "touchmove" && this.isDrawing) {
      console.log("touchmove");
      const touch = e.changedTouches[0];
      let touchX = parseInt(touch.clientX - offsetX);
      let touchY = parseInt(touch.clientY - offsetY);
      this.ctx.lineTo(touchX, touchY);
      // will form the lines
      this.ctx.stroke();
      // ensures that the line is continious
      this.ctx.beginPath();
      this.ctx.moveTo(touchX, touchY);
    }
  };

  // on mouse up, stop the drawing
  stopDrawing = (e) => {
    this.isDrawing = false;
    // resets the path
    this.ctx.beginPath();

    if (e.type === "touchend") {
      console.log("touchend");
      this.isDrawing = false;
      this.ctx.beginPath();
    }
  };

  // function that allows user to change the default strokeStyle of black and instead choose a custom color
  // hexcolor that user has chosen is retrieved from ColorButton.js which is then passed from Buttons.js to Canvas.js
  changeColor = (selectedColor) => {
    // user's color selection will not be stored if they pick white or off-white colors
    if (forbiddenColors.indexOf(selectedColor) === -1) {
      this.ctx.strokeStyle = selectedColor;
      // prevents user from spamming database with blank looking drawings
    } else {
      this.setState({
        showModal: true,
        modalText:
          "Please pick another color. Do not be a troll and save a blank drawing.",
        modalHeader: "Troll alert!",
      });
    }
  };

  // function that allows user to clear the entire canvas on click
  clearCanvas = () => {
    this.ctx.clearRect(0, 0, 450, 500);
  };

  // function that allows user to choose a different drawing word on click
  // state is set every time this is called
  nextWord = () => {
    this.setState({
      drawingWord: this.getRandomWord(words),
    });
  };

  // function that returns a random array item
  getRandomWord = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  // function that saves or rejects the user's drawing
  saveDrawing = () => {
    // save canvas image to variable (png format by default, stores the drawing as a base64 string)
    const drawingUrl = this.canvas.current.toDataURL();
    // saves the random drawing word from state to another variable
    const drawingWord = this.state.drawingWord;
    // create a reference to the database and save it to a variable
    const dbRef = firebase.database().ref();

    // checks if the canvas is empty or not
    // if it is empty, then the modal will run prompting the user to draw something before submitting
    // nothing will get stored to the databse
    if (this.isCanvasBlank(this.canvas.current)) {
      // set state to have the modal triggered and allow a re-render to occur
      this.setState({
        showModal: true,
        modalText:
          "Please draw something before saving your work to the gallery.",
        modalHeader: "Oops...",
      });
    } else {
      // if the canvas isn't empty then store an object that contains the drawingUrl and drawingWord properties into the databse
      dbRef.push({ drawingUrl, drawingWord });
      // immediately clear the canvas after the information gets stored
      this.clearCanvas();

      // set state to have the modal triggered and allow a re-render to occur
      // modal will show user a success message
      this.setState({
        showModal: true,
        modalText:
          "Your drawing has been saved to the gallery. Go check it out!",
        modalHeader: "Success!",
      });
    }
  };

  // returns true if every pixel's uint32 representation is 0 (or "blank")
  // thank you Austin Brunkhorst @ stackoverflow.com for this code (https://stackoverflow.com/questions/17386707/how-to-check-if-a-canvas-is-blank)
  isCanvasBlank = (canvas) => {
    const pixelBuffer = new Uint32Array(
      this.ctx.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    );
    return !pixelBuffer.some((color) => color !== 0);
  };

  render() {
    return (
      <main>
        <section>
          <h2 className="drawItHeading">
            Draw It <span aria-hidden="true">✏️</span>
          </h2>
          <div className="drawItContainer wrapper">
            <Buttons
              colorFn={this.changeColor}
              clearFn={this.clearCanvas}
              nextWordFn={this.nextWord}
              saveFn={this.saveDrawing}
            />

            <SweetAlert
              show={this.state.showModal}
              title={this.state.modalHeader}
              text={this.state.modalText}
              onConfirm={() => this.setState({ showModal: false })}
            />

            <div className="canvasAndHowTo">
              <h3>{this.state.drawingWord}</h3>
              <canvas
                ref={this.canvas}
                className="canvas"
                onMouseDown={this.startDrawing}
                onMouseMove={this.draw}
                onMouseUp={this.stopDrawing}
                onTouchStart={this.startDrawing}
                onTouchMove={this.draw}
                onTouchEnd={this.stopDrawing}
                width={this.state.width}
                height={this.state.height}
              ></canvas>
              <HowToPlay />
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default Canvas;
