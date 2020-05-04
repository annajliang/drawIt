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

  // calls setMatchingImgAndWord to match the correct drawing word with the correct drawing image and then update state to trigger a re-render
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
      this.guessModal("Correct!", "You are a guessing master. Great job!");
      this.setState({
        userInput: ""
      })
    } else {
      // if the user's input does not match then an alert is fired informing the user they are incorrect
      this.guessModal("Wrong!", "Sorry that was the incorrect answer. Please guess again.");
      this.setState({
        userInput: "",
      });
    }
  };

  guessModal = (title, text) => {
    Swal.fire({
      // if the user's input does not match then an alert is fired informing the user they are incorrect
      title: title,
      text: text,
    });
  }

  // gets what the user has typed from the input form
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