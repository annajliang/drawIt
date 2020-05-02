import React, { Component } from 'react';
import Swal from "sweetalert2";

class Guess extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      correctGuess: "",
    }
  }

  componentDidMount() {
    this.findMatchingWord(this.props.drawings);

    console.log('from componentDidMouth', this.props.drawings)
  }

  // NOT CALLED ON INITIAL RENDER
  // YOU GET NEW PROPS, YOU WANT TO DO SOMETHING WITH THOSE PROPS
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.imgId !== this.props.match.params.imgId) {
      this.findMatchingWord(this.props.drawings);
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    const alteredUserInput = this.state.userInput;
    const alteredCorrectGuess = this.state.correctGuess;
    if (alteredUserInput.toLowerCase().replace(/\s/g, "") === alteredCorrectGuess.replace(/\s/g, "")) {
      console.log('that is the right guess!')
      Swal.fire({
        title: "Correct!",
        text: "You are a guessing master. Great job!",
      });
    } else {
      console.log('whoops, that guess is wrong! try again!')
      Swal.fire({
        title: "Wrong!",
        text: "Sorry that was the incorrect answer. Please guess again.",
      });
    }
  }

  handleUserInput = (e) => {
    this.setState({
      userInput: e.target.value
    })
  }

  // narrow down to only the drawing object that matches what the user clicks on
  // filter through the drawing objected (nested in an array) to find the correct keyword
  // store that keyword in state

  //needs array of drawing info


  //findMatchingWord returns nothing
  findMatchingWord = (drawingsArray) => {
    //return returns from callback, does not return from findMatchingWord
    const matchingDrawings = drawingsArray.filter((currentDrawing) => {
      return currentDrawing.drawingId === this.props.match.params.imgId;
    })

    if (matchingDrawings.length > 0) {
      this.setState({
        correctGuess: matchingDrawings[0].drawingWord,
        drawingUrl: matchingDrawings[0].drawingUrl
      })
    }
    // console.log('drawingsArray from findMatchingWord', drawingsArray);
    // console.log("matchingDrawings[0].drawingWord from findMatchingWord", matchingDrawings[0].drawingWord);
    // console.log("matchingDrawings[0].drawingUrl from findMatchingWord", matchingDrawings[0].drawingUrl);
    // console.log("matchingDrawings.length from findMatchingWord", matchingDrawings.length);
  }

  //Render happens after a state change and after it receive new PROPS!
  render() {
    console.log("drawings array from Guess.js", this.props.drawings);
    console.log("imgId from Guess.js", this.props.match.params.imgId);
    return (
      <section className="guessSection">
        <div className="wrapper">
          <div className="guessContainer">
            <h2 className="guessItHeading">Guess It <span role="img" alt="" aria-label="">🤔</span></h2>
            <div className="guessDrawing">
              <span className="buttonText">
                <img src={this.state.drawingUrl} alt="" />
              </span>
            </div>
            <p>Type your guess into the input bar below.</p>
            <form action="submit" onSubmit={this.handleClick}>
              <input type="text" value={this.state.userInput} onChange={this.handleUserInput} className="guessInput" />
              <button type="submit" className="guessButton">Submit</button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default Guess;