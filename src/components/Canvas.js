import React, { Component } from 'react';
import Buttons from './Buttons';
import HowToPlay from './HowToPlay';
import words from '../data/words';

class Canvas extends Component {
    constructor() {
        super();
        this.isDrawing = false;
        this.state = {
            // stores the drawing as a base64 string
            drawingStr: "",
        }
    }

    //hey there's shit on the page, now we can get some data and do some shit now that the page is ready to go
    //only runs once after the render
    componentDidMount() {
        console.log('i mounted');
        //finding the canvas element and saving it to a variable
        const canvas = this.refs.canvas;
        //creating a drawing object for our canvas and saving it to a variable
        //this drawing object is what we’ll actually be drawing on
        this.ctx = canvas.getContext("2d");

        //color of stroke
        this.ctx.strokeStyle = "#000";
        // shape of the stroke essentially & making sure the line is continuous

        // size of the stroke
        this.ctx.lineWidth = 7;
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        console.log(this.ctx);
    }

    /*start drawing on mousedown*/
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

    /*on mouseclick release - stop drawing*/
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

    getRandomArrayItem = (array) => {
        return array[Math.floor(Math.random() * array.length)];
    };

    saveDrawing = () => {
        const canvas = this.refs.canvas;
        const drawingUrl = canvas.toDataURL();
        console.log(drawingUrl);
        this.setState({
            drawingStr: drawingUrl,
        })
    }

    render() {
        console.log('i rendered');
        return (
            <section>
                <h2>draw it <span role="img" alt="" aria-label="">✏️</span></h2>
                <div className="drawItContainer wrapper">
                    <Buttons colorFn={this.changeColor} clearFn={this.clearCanvas} eraseFn={this.eraseCanvas} saveFn={this.saveDrawing}/>
                    <div className="canvasAndHowTo">
                        <h3>{this.getRandomArrayItem(words)}</h3>
                        <canvas ref="canvas" className="canvas" onMouseDown={this.startDrawing} onMouseMove={this.draw} onMouseUp={this.stopDrawing} width={450} height={500} />
                        <HowToPlay />
                    </div>
                </div>
            </section>
        )
    }
}

export default Canvas;