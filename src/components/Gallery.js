import React, { Component } from 'react';
import firebase from "./../firebase";

class Gallery extends Component {
    constructor() {
        super();
        this.state = {
            drawings: []
        }
    }

    componentDidMount() {
        const dbRef = firebase.database().ref();

        dbRef.on('value', (snapshot) => {
            const dbData = snapshot.val();
            console.log(dbData);

            const drawingsArray = [];

            for (let key in dbData) {
                drawingsArray.push(dbData[key]);
            }

            this.setState({
                drawings: drawingsArray,
            })
        })

    }

    render() {
        return(
            <section className="gallery">
                <div className="wrapper">
                    <p>A collection of drawings done by other users around the globe! Can you guess the correct word?</p>
                    <ul className="galleryGrid">
                        {
                            this.state.drawings.map((drawing, i) => {
                                return (
                                  <li className="userDrawing">
                                    <span className="buttonText">
                                      <img src={drawing} alt="" key={i} />
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