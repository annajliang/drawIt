import React, { Component } from 'react';
import firebase from "../firebase";
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
        const dbRef = firebase.database().ref();

        //ASYNC FUNCTION!!!! LIKE IN JQUERY AJAX CALL
        //CALLBACKS HAPPEN WHEN THEY ARE READY //DONT KNOW WHEN IT WILL HAPPEN
        dbRef.on('value', (snapshot) => {
            const dbData = snapshot.val();
            const drawingsArray = [];

            for (let key in dbData) {
              drawingsArray.push({
                drawingWord: dbData[key].drawingWord,
                drawingUrl: dbData[key].drawingUrl,
                drawingId: key,
              });
            }
            
            this.findMatchingWord(drawingsArray);
        })
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
    

    findMatchingWord = (drawingsArray) => {
      const matchingDrawings = drawingsArray.filter((currentDrawing) => {
        return currentDrawing.drawingId === this.props.match.params.imgId;
    })

    this.setState({
      correctGuess: matchingDrawings[0].drawingWord,
      drawingUrl: matchingDrawings[0].drawingUrl
    })
  }



    render() {
      
        // console.log('props', this.props);
        // console.log('state', this.state.drawings);
        // console.log(this.state.correctGuess);

            // if (this.state.drawings.length === 0) {
            //     return (
            //         <div></div>
            //     )
            // } else {
            //      const matchingDrawing = this.state.drawings.filter((currentDrawing) => {
            //         return currentDrawing.drawingId === this.props.match.params.imgId;
            //     });


              // console.log('user word', this.state.userInput)
              // console.log('actual word', matchingDrawing[0].drawingWord)

                
              // console.log('matching', matchingDrawing);
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
                          <input type="text" value={this.state.userInput} onChange={this.handleUserInput} className="guessInput"/>
                          <button type="submit" className="guessButton">Submit</button>
                        </form>
                      </div>
                    </div>
                  </section>
                );
            }
    }

export default Guess;