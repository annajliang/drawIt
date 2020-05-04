import React, { Component } from 'react';
import Swal from "sweetalert2";

class Guess extends Component {
  constructor() {
    super();
    this.state = {
      // inital states
      userInput: "",
      correctGuess: "",
    };
  }

  componentDidMount() {
    this.setMatchingImgAndWord(this.props.drawings);
  }

  // not called on inital render
  // new props are received, need to compare the new props to the previous props
  componentDidUpdate(prevProps) {
    // in this case, want to compare the previous props' imgId with the new props' imgId
    if (prevProps.match.params.imgId !== this.props.match.params.imgId) {
      // if they are not a match then call setMatchingImgAndWord
      this.setMatchingImgAndWord(this.props.drawings);
    }
  }

  checkUserInput = (e) => {
    e.preventDefault();
    // this.state.userInput and this.state.correctGuess are stored in new variables so that we may change their values
    const alteredUserInput = this.state.userInput;
    const alteredCorrectGuess = this.state.correctGuess;

    // converts alteredUserInput to lowercase and disregards any empty spaces so that it can be compared to alteredCorrectGuess
    if (alteredUserInput.toLowerCase().replace(/\s/g, "") === alteredCorrectGuess.replace(/\s/g, "")) {
      // if the user's input matches the correct guess then an alert is fired informing the user they are correct
      Swal.fire({
        title: "Correct!",
        text: "You are a guessing master. Great job!",
      });
    } else {
      Swal.fire({
        // if the user's input does not match then an alert is fired informing the user they are incorrect
        title: "Wrong!",
        text: "Sorry that was the incorrect answer. Please guess again.",
      });
    }
  };

  getUserInput = (e) => {
    this.setState({
      userInput: e.target.value,
    });
  };

  setMatchingImgAndWord = (drawingsArray) => {
    // passes in the this.props.drawings array and filters through each object in the array to find an id that matches with the id of the drawing that is to be displayed on the page
    const findCorrectDrawingObj = drawingsArray.filter((drawing) => {
      return drawing.drawingId === this.props.match.params.imgId;
    });

    // condition to make sure that we are actually getting something back 
    if (findCorrectDrawingObj.length > 0) {
      //once the correct object has been found, set state to store the drawing's corresponding drawingWord and drawingUrl
      this.setState({
        correctGuess: findCorrectDrawingObj[0].drawingWord,
        drawingUrl: findCorrectDrawingObj[0].drawingUrl,
      });
    }
  };

  // render happens after a state change and after it receive new props
  render() {
    return (
      <section className="guessSection">
        <div className="wrapper">
          <div className="guessContainer">
            <h2 className="guessItHeading">
              Guess It <span aria-hidden="true">🤔</span>
            </h2>
            <div className="guessDrawing">
              <span className="showText">
                <img src={this.state.drawingUrl} alt="" />
              </span>
            </div>
            <p>Type your guess into the input bar below.</p>
            <form action="submit" onSubmit={this.checkUserInput}>
              <input
                type="text"
                value={this.state.userInput}
                onChange={this.getUserInput}
                className="guessInput"
              />
              <button type="submit" className="guessButton">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default Guess;