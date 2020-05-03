import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Canvas from './components/Canvas';
import Footer from './components/Footer';
import Guess from './components/Guess'
import Gallery from './components/Gallery'
import firebase from "./firebase";
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      drawingsArray: [],
      randomDrawingObj: undefined
    }
  }

  componentDidMount() {
    // saving reference to the entire database that was just made
    const dbRef = firebase.database().ref();

    // listening for any change to the entire database
    dbRef.on('value', (snapshot) => {
      // when data changes in the database, do the following:
      // .val() will return the data in the form of an object from the database
      const dbData = snapshot.val();

      const drawingsArray = [];

      for (let key in dbData) {
        drawingsArray.push({
          drawingWord: dbData[key].drawingWord,
          drawingUrl: dbData[key].drawingUrl,
          drawingId: key,
        });
      }

      this.setState({
        drawingsArray: drawingsArray,
      })
      this.setInitialRandomDrawingObj(drawingsArray);
    })
  }

  setInitialRandomDrawingObj = (drawingsArray) => {
    if (drawingsArray.length > 0) {
      this.setState({
        randomDrawingObj: this.getRandomArrayItem(this.state.drawingsArray),
      });
    }
  };

  getRandomArrayItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  //FOR CLICK HANDLER!!! RENAME!! ONLY FOR BUTTON
  setRandomIdStrState = () => {
    this.setState({
      randomDrawingObj: this.getRandomArrayItem(this.state.drawingsArray)
    });
  }

  render() {
    console.log('drawingArray from App.js', this.state.drawingsArray)
    console.log("randomDrawingObj from App.js", this.state.randomDrawingObj)

    if (this.state.drawingsArray.length > 0 && this.state.randomDrawingObj !== undefined) {
      return (
        <Router>
          <div className="App">
            <ScrollToTop />
            <Header randomDrawingObj={this.state.randomDrawingObj} getRandomId={this.setRandomIdStrState}/>
            <Route exact path="/" component={Canvas} />
            <Route path="/gallery" render={(props) => <Gallery {...props} drawings={this.state.drawingsArray}/>}/>
            <Route path="/guess/:imgId" render={(props) => <Guess {...props } drawings={this.state.drawingsArray} />} />
            <Footer />
          </div>
        </Router>
      );
    } else {
      return null
    }
  }
}

export default App;
