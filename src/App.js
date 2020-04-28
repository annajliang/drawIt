import React, { Component } from 'react';
// import words from './data/words';
import { BrowserRouter as Router, Route } from "react-router-dom";
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
          <Header />
          <main>
            {/* <Canvas /> */}
            <Route exact path="/" component={Canvas} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/guess" component={Guess} />
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
