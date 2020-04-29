import React, { Component } from 'react';
import firebase from "../firebase";

class Guess extends Component {
    constructor() {
        super();
        this.state = {
            drawings: [],
        }
    }

    componentDidMount() {
        const dbRef = firebase.database().ref();

        dbRef.on('value', (snapshot) => {
            const dbData = snapshot.val();
            console.log("DATA", dbData);

            const drawingsArray = [];

            for (let key in dbData) {
              drawingsArray.push({
                drawingWord: dbData[key].drawingWord,
                drawingUrl: dbData[key].drawingUrl,
                drawingId: key,
              });
            }

            this.setState({
                drawings: drawingsArray,
            })
        })
    }

    render() {
        console.log('props', this.props);
        console.log('state', this.state.drawings);

            if (this.state.drawings.length === 0) {
                return (
                    <div></div>
                )
            } else {
                 const matchingDrawing = this.state.drawings.filter((currentDrawing) => {
                    return currentDrawing.drawingId === this.props.match.params.imgId;
                });
                return (
                  <section className="guessSection">
                    <div className="wrapper">
                      <div className="guessContainer">
                        <p>Please type your guess into the form below.</p>
                        <div className="guessDrawing">
                          <span className="buttonText">
                            <img src={matchingDrawing[0].drawingUrl} alt="" />
                          </span>
                        </div>
                        <form action="submit">
                          <input type="text" />
                          <input type="submit" />
                        </form>
                      </div>
                    </div>
                  </section>
                );
            }
    }
}

// this.props.match.params.imgId

export default Guess;