import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import Canvas from "./components/Canvas";
import Guess from "./components/Guess";
import Gallery from "./components/Gallery";
import firebase from "./firebase";
import "./App.css";

const App = () => {
  const [drawingsArray, setDrawingsArray] = useState([]);
  const [randomDrawingObj, setRandomDrawingObj] = useState(undefined);

  // function that will take in newDrawingsArray and check whether or not newDrawingsArray has any items in it before state is set
  // once newDrawingsArray is populated with array items, update the state of randomDrawingObj to include a randomly selected array item (each array item is an object)
  const setInitialRandomDrawingObj = (array) => {
    if (array.length > 0) {
      setRandomDrawingObj(getRandomArrayItem(array));
    }
  };

  useEffect(() => {
    // saving reference to the entire database that was just made
    const dbRef = firebase.database().ref();

    // listening for any change to the entire database
    dbRef.on("value", (snapshot) => {
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
      setDrawingsArray(drawingsArrayFromDb);

      // after the data is retrieved from the database, call the function setInitialRandomDrawingObj with drawingsArrayFromDb as the argument
      setInitialRandomDrawingObj(drawingsArrayFromDb);
    });
  }, []);

  // function that takes in an array and returna a random array item
  const getRandomArrayItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  // click handler function that gets passed as a prop from App.js to Header.js to Navbar.js
  // will get called on a click event from the child component, Navbar.js
  const setRandomIdStr = () => {
    // random object from this.state.drawingsArray is retrieved everytime the click happens in the child Navbar.js component and then state gets re-updated on every click
    setRandomDrawingObj(getRandomArrayItem(drawingsArray));
  };

  // condition that ensures the JSX is only returned when the data from the callback function in dbRef.on() is retrieved so that the initial drawingArrays and randomDrawingObj actually have the information we want in it before they are rendered to the page
  if (drawingsArray.length > 0 && randomDrawingObj !== undefined) {
    return (
      <Router>
        <div className="App">
          <ScrollToTop />
          <Header
            randomDrawingObj={randomDrawingObj}
            getRandomId={setRandomIdStr}
          />
          <Route exact path="/" component={Canvas} />
          <Route
            path="/gallery"
            render={(props) => <Gallery {...props} drawings={drawingsArray} />}
          />
          <Route
            path="/guess/:imgId"
            render={(props) => <Guess {...props} drawings={drawingsArray} />}
          />
        </div>
      </Router>
    );
  } else {
    return null;
  }
};

export default App;
