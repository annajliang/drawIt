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
      drawingsArray: []
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
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <ScrollToTop />
          <Header />
          <Route exact path="/" component={Canvas} />
          <Route path="/gallery" render={(props) => <Gallery {...props} drawings={this.state.drawingsArray}/>}/>
          <Route path="/guess/:imgId" render={(props) => <Guess {...props } drawings={this.state.drawingsArray} />} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
