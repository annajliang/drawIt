import React, { Component } from 'react';
import { Link } from "react-router-dom";
import firebase from "../firebase";

class Gallery extends Component {
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
        console.log(this.state.drawings);
        return(
            <section className="gallery">
                <div className="wrapper">
                    <p>A collection of drawings done by other users around the globe! Can you guess the correct word?</p>
                    <ul className="galleryGrid">
                        {

                            //SAVE IN VARIABLE AND USE .MAP(), DO NOT DO IT DIRECTLY TO STATE
                            this.state.drawings.map((drawing, i) => {
                                return (
                                  <li className="userDrawing" key={drawing.drawingId}>
                                    <span className="buttonText">
                                      <Link to={`/guess/${drawing.drawingId}`}>
                                        <img src={drawing.drawingUrl} alt="" />
                                      </Link>
                                    </span>
                                  </li>
                                );

                            })
                        }
                    </ul>
                </div>
            </section>
        )
    }
}

export default Gallery;