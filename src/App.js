import React, { Component } from 'react';
// import words from './data/words';
import Header from './components/Header';
import Canvas from './components/Canvas';
import Footer from './components/Footer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <Canvas />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
