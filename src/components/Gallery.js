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
            <div className="gallery">
                <p>A collection of drawings done by other users around the globe! Can you guess the correct word?</p>
                <ul className="galleryGrid">
                    {
                        this.state.drawings.map((drawing, i) => {
                            return(
                                <li className="userDrawing">
                                    <img src={drawing} alt="" key={i}/>
                                </li>
                            )

                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Gallery;