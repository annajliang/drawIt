import React, { Component } from 'react';
// import words from './data/words';
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
      // allDrawingIds: [],
      randomDrawingObj: undefined
    }
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();

    dbRef.on('value', (snapshot) => {
      const dbData = snapshot.val();
      // console.log("DATA", dbData);

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
    // const ids = drawingsArray.map((drawingObj) => {
    //   return drawingObj.drawingId;
    // });

    if (drawingsArray.length > 0) {
      this.setState({
        randomDrawingObj: this.getRandomArrayItem(this.state.drawingsArray),
      });
    }
  };

  getRandomArrayItem = (array) => {
    console.log('click')
    // this.setState({
    //   randomIdStr: this.state.randomIdStr
    // });
    return array[Math.floor(Math.random() * array.length)];
  };

  // getRandomArrayItem = () => {
  //   console.log('click')
  //   this.setState({
  //     randomIdStr: this.state.allDrawingIds[Math.floor(Math.random() * this.state.allDrawingIds.length)]
  //   });
  //   // return array[Math.floor(Math.random() * array.length)];
  // };

  //FOR CLICK HANDLER!!! RENAME!! ONLY FOR BUTTON
  setRandomIdStrState = () => {
    this.setState({
      randomDrawingObj: this.getRandomArrayItem(this.state.drawingsArray)
    });
  }

  // checkEmptyDrawingsArray = () => {
  //   if (this.state.drawingsArray.length > 0) {

  //   }
  // }


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
