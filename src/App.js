import React, { Component } from 'react';
// import words from './data/words';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.css';

class App extends Component {
  // getRandomArrayItem = (array) => {
  //   return array[Math.floor(Math.random() * array.length)];
  // };

  render() {
    return (
      <div className="App">
        <Header />
        {/* <h2>{this.getRandomArrayItem(words)}</h2> */}
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
