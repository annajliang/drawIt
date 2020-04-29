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
            console.log(dbData);

            const drawingsArray = [];

            for (let key in dbData) {
                drawingsArray.push({ drawingUrl: dbData[key], drawingId: key });
            }

            this.setState({
                drawings: drawingsArray,
            })
        })
    }

    render() {
        // console.log(this.state.drawings);

            if (this.state.drawings.length === 0) {
                return (
                    <div>hjhhljlj</div>
                )
            } else {
                 const drawingShit = this.state.drawings.filter((currentDrawing) => {
                    return currentDrawing.drawingId === this.props.match.params.imgId;
                });
                return (
                  <div className="guess">
                    <p>This is some dummy text.</p>
                    <img src={drawingShit[0].drawingUrl} alt="" />
                  </div>
                );
            }
    }
}

// this.props.match.params.imgId

export default Guess;