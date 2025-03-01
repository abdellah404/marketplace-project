import React from "react";
import "./Card.css";

export default function Card({ title, description, image, price }) {


  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };


  return (
    <div className="col-lg-12 d-flex">
      <div className="card h-100 d-flex flex-column">
        <div className="img-wrapper">
          <img src={image} className="card-img-top" alt={title} />
        </div>
        <div className="card-body d-flex flex-column">
        <h5 className="card-title">{truncateText(title, 15)}</h5> {/* Limit title to 20 chars */}
          <p className="card-text">{truncateText(description, 75)}</p> {/* Limit description to 100 chars */}
          <p className="card-text text-muted">{price} USD</p>
          <a href="#" className="btn btn-primary mt-auto">Go somewhere</a>
        </div>
      </div>
    </div>
  );
}
