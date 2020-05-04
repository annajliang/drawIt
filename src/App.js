import React, { Component } from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
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
      // inital states
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

      const drawingsArrayFromDb = [];

      // turning the object from the database into an array
      for (let key in dbData) {
        drawingsArrayFromDb.push({
          drawingWord: dbData[key].drawingWord,
          drawingUrl: dbData[key].drawingUrl,
          drawingId: key,
        });
      }

      // update state to include the newly converted array
      this.setState({
        drawingsArray: drawingsArrayFromDb,
      });

      // after the data is retrieved from the database, call the function setInitialRandomDrawingObj with drawingsArrayFromDb as the argument
      this.setInitialRandomDrawingObj(drawingsArrayFromDb);
    })
  }

  // function that will take in newDrawingsArray and check whether or not newDrawingsArray has any items in it before state is set
  // once newDrawingsArray is populated with array items, update the state of randomDrawingObj to include a randomly selected array item (each array item is an object)
  setInitialRandomDrawingObj = (array) => {
    if (array.length > 0) {
      this.setState({
        randomDrawingObj: this.getRandomArrayItem(this.state.drawingsArray),
      });
    }
  };

  // function that takes in an array and returna a random array item
  getRandomArrayItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  // click handler function that gets passed as a prop from App.js to Header.js to Navbar.js
  // will get called on a click event from the child component, Navbar.js
  setRandomIdStr = () => {
    this.setState({
      // random object from this.state.drawingsArray is retrieved everytime the click happens in the child Navbar.js component and then state gets re-updated on every click
      randomDrawingObj: this.getRandomArrayItem(this.state.drawingsArray)
    });
  }

  render() {
    // condition that ensures the JSX is only returned when the data from the callback function in dbRef.on() is retrieved so that the initial drawingArrays and randomDrawingObj actually have the information we want in it before they are rendered to the page
    if (this.state.drawingsArray.length > 0 && this.state.randomDrawingObj !== undefined) {
      return (
        <Router>
          <div className="App">
            <ScrollToTop />
            <Header randomDrawingObj={this.state.randomDrawingObj} getRandomId={this.setRandomIdStr}/>
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
