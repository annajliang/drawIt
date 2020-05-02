import React, { Component } from 'react';
import Buttons from './Buttons';
import HowToPlay from './HowToPlay';
import words from '../data/words';
import firebase from "../firebase";
import SweetAlert from "sweetalert2-react";

class Canvas extends Component {
    constructor() {
        super();
        this.isDrawing = false;
        this.canvas = React.createRef();
        this.state = {
            drawingWord: "",
            showModal: false,
            modalText: "",
            modalHeader: ""
        }
    }

    //hey there's things on the page nos, now we can get some data and do some shit now that the page is ready to go
    //only runs once after the render
    componentDidMount() {
        console.log('i mounted');
        //finding the canvas element and saving it to a variable
        // const canvas = this.refs.canvas;
        //creating a drawing object for canvas and saving it to a variable
        //this is what we’ll actually be drawing on
        this.ctx = this.canvas.current.getContext("2d");

        //color of stroke
        this.ctx.strokeStyle = "#000";
        // shape of the stroke, making sure the line is continuous

        // size of the stroke
        this.ctx.lineWidth = 7;
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        console.log(this.ctx);
        this.setState({
            drawingWord: this.getRandomWord(words)
        })
    }

    //start drawing on mousedown
    // MY render is not depending on the state 
    // whole point of setState is to TRIGGER A RENDER WITH NEW VALUES OF STATE!!!!
    // MY RENDER HAS NO STATE IN IT!!
    startDrawing = (e) => {
        this.isDrawing = true;
        this.draw(e);
    }

    // draw lines as mouse moves
    draw = (e) => {
        if (this.isDrawing) {

            //DO NOT CHANGE ORDER (find out why)
            this.ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        }
    }

    //on mouseclick release - stop drawing
    stopDrawing = () => {
        this.isDrawing = false;
        this.ctx.beginPath();
    }

    changeColor = (color) => {
        // console.log(color)
        console.log('clicked');
        this.ctx.strokeStyle = color;
    }

    clearCanvas = () => {
        console.log('i cleared!');
        this.ctx.clearRect(0, 0, 450, 500);
    }

    eraseCanvas = () => {
        console.log('i erased!');
        this.ctx.strokeStyle = "#fff";
        // this.ctx.globalCompositeOperation = "destination-out";
        // this.ctx.fill();
    }

    getRandomWord = (array) => {
        return array[Math.floor(Math.random() * array.length)];
    };

    //prevent user from saving empty canvas
    //condition to check whether canvas if empty or not
        //if empty, modal telling the user to draw something
        //if contained, drawing gets stored to database and modal pops up thanking user

    saveDrawing = () => {
        // const canvas = this.refs.canvas;
        // save canvas image as data url (png format by default)
        const drawingUrl = this.canvas.current.toDataURL();
        // console.log(drawingUrl);
        const drawingWord = this.state.drawingWord;
        console.log('secret word', drawingWord);
        const dbRef = firebase.database().ref();
        // dbRef.push({ drawingUrl, drawingWord });
        if (this.isCanvasBlank(this.canvas.current)) {
            console.log('draw something')

            this.setState({
                showModal: true,
                modalText: "Please draw something before saving your work to the gallery.",
                modalHeader: "Oops..."
            })
        } else {
            dbRef.push({ drawingUrl, drawingWord });
            this.clearCanvas();

            this.setState({
                showModal: true,
                modalText: "Your drawing has been saved to the gallery. Go check it out!",
                modalHeader: "Success!"
            })
        }
    }

    //using .getImageData() to find "colored" pixels (non-zero values)

    //CREDIT THIS CODE
    isCanvasBlank = (canvas) => {
        // const context = canvas.getContext('2d');
        const pixelBuffer = new Uint32Array(
            this.ctx.getImageData(0, 0, canvas.width, canvas.height).data.buffer
        );
        return !pixelBuffer.some(color => color !== 0)
    }

    // any functions called here will be called MULITPLE TIMES!!!
    // do not put your random function here, stupid!!
    render() {
        console.log('i rendered');
        return (
            <main>
                <section>
                    <h2 className="drawItHeading">Draw It <span role="img" alt="" aria-label="">✏️</span></h2>
                    <div className="drawItContainer wrapper">
                        <Buttons 
                            colorFn={this.changeColor} 
                            clearFn={this.clearCanvas} 
                            eraseFn={this.eraseCanvas} 
                            saveFn={this.saveDrawing}/>
                        <SweetAlert
                            show={this.state.showModal}
                            title={this.state.modalHeader}
                            text={this.state.modalText}
                            onConfirm={() => this.setState({ showModal: false })}/>
                        <div className="canvasAndHowTo">
                            <h3>{this.state.drawingWord}</h3>
                            <canvas ref={this.canvas} className="canvas" onMouseDown={this.startDrawing} onMouseMove={this.draw} onMouseUp={this.stopDrawing} width={450} height={500} />
                            <HowToPlay />
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}

export default Canvas;