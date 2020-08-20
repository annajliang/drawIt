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
    this.isBlank = null;
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
      isDisabled: false,
      submissionTime: null,
      reSubmissionTime: null,
    };
  }

  // only runs once after the render
  componentDidMount() {
    let subTime;
    let subTimestamp;
    let resubTime;
    let resubTimestamp;

    this.ctx = this.canvas.current.getContext("2d");
    this.isBlank = this.canvas.current.toDataURL();
    this.handleResize();
    window.addEventListener("resize", this.handleResize.bind(this));

    // get a random drawing word from the words array in words.js and set it to state to get re-rendered on the page
    this.setState({
      drawingWord: this.getRandomWord(words),
    });

    if (localStorage.getItem("submissionTime") !== null) {
      subTime = localStorage.getItem("submissionTime").split(' ').slice(4, 5).join('').replace(/:/g, ".");
      subTimestamp = subTime.slice(3, subTime.length);

      resubTime = localStorage.getItem("resubmissionTime").split(' ').slice(4, 5).join('').replace(/:/g, ".");
      resubTimestamp = resubTime.slice(3, resubTime.length);
    } 

    if (resubTimestamp - subTimestamp < 1) {
      this.setState({
        isDisabled: true,
        submissionTime: new Date(),
      });
    } else {
      this.setState({
        isDisabled: false,
      });
    }
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
    }
  };

  // draw lines as mouse moves
  draw = (e) => {
    // ensures that we get a smooth drawing rather than a squared-off edge by default
    this.ctx.lineJoin = "round";
    this.ctx.lineCap = "round";

    // returns the size of the canvas element and its position relative to the viewport
    const pos = this.canvas.current.getBoundingClientRect();
    let offsetX = pos.left;
    let offsetY = pos.top;
    let x;
    let y;

    // if the condition is true, then whatever the coordinates are for where the user chooses to place their mouse and begin drawing, form a continous line until the condition is false
    if (this.isDrawing) {
      if (e.type === "mousemove") {
        x = e.clientX - offsetX;
        y = e.clientY - offsetY;
      }

      else if (e.type === "touchmove") {
        const touch = e.changedTouches[0];
        x = touch.clientX - offsetX;
        y = touch.clientY - offsetY;
      }

      this.ctx.lineTo(x, y);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
    }
  };


  // on mouse up, stop the drawing
  stopDrawing = (e) => {
    this.isDrawing = false;
    this.ctx.beginPath();
    this.ctx.closePath();

    if (e.type === "touchend") {
      this.isDrawing = false;
      this.ctx.beginPath();
    }
  };

  strokeSize = (size) => {
    this.ctx.lineWidth = size;
  }

  // function that allows user to change the default strokeStyle of black and instead choose a custom color
  // hexcolor that user has chosen is retrieved from ColorButton.js which is then passed from Buttons.js to Canvas.js
  changeColor = (selectedColor) => {
    // console.log(selectedColor)
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
    if (drawingUrl === this.isBlank) {
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
      localStorage.setItem("submissionTime", new Date())

      // set state to have the modal triggered and allow a re-render to occur
      // modal will show user a success message
      this.setState({
        showModal: true,
        modalText:
          "Your drawing has been saved to the gallery. Go check it out!",
        modalHeader: "Success!",
        isDisabled: true,
        submissionTime: new Date(),
      });
    }
  };

  checkIfUserCanSave = () => {
    localStorage.setItem("resubmissionTime", new Date());

    this.setState({
      reSubmissionTime: new Date(),
    });

    if (this.state.reSubmissionTime - this.state.submissionTime < 60000) {
        this.setState({
          showModal: true,
          modalText:
            "In order to prevent spamming of the gallery, please wait a minute before saving another drawing.",
          modalHeader: "Please wait!",
        });
    } else {
      this.setState({
        isDisabled: false,
      });
      this.saveDrawing();
    }
  }

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
              strokeFn={this.strokeSize}
              clearFn={this.clearCanvas}
              nextWordFn={this.nextWord}
              saveFn={this.saveDrawing}
              disabled={this.state.isDisabled}
              checkSaveFn={this.checkIfUserCanSave}
            />

            <SweetAlert
              show={this.state.showModal}
              title={this.state.modalHeader}
              text={this.state.modalText}
              onOutsideClick={() => this.setState({ showModal: false })}
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