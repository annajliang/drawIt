import React, { Component } from 'react';
// import words from './data/words';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Canvas from './components/Canvas';
import Footer from './components/Footer';
import Guess from './components/Guess'
import Gallery from './components/Gallery'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <ScrollToTop />
          <Header />
          <Route exact path="/" component={Canvas} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/guess/:imgId" component={Guess} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
