import React, { Component } from "react";
import { Link } from "react-router-dom";

class Gallery extends Component {
  render() {
    return (
      <section className="gallery">
        <div className="wrapper">
          <h2 className="seeItHeading">
            See It <span aria-hidden="true">👀</span>
          </h2>
          <p>A collection of drawings done by other users around the globe!</p>
          <p>
            Marvel at their beauty or click the drawing to play along and try to
            guess what
          </p>
          <p>you think the user was trying to draw.</p>
          <ul className="galleryGrid">
            {this.props.drawings.map((drawing) => {
              return (
                <li className="userDrawing" key={drawing.drawingId}>
                  <span className="buttonText">
                    <Link to={`/guess/${drawing.drawingId}`}>
                      <img src={drawing.drawingUrl} alt="" />
                    </Link>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    );
  }
}

export default Gallery;
