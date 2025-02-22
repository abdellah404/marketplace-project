import React from "react";
import "./Card.css";

export default function Card({ title, description, image, price }) {
  return (
    
    <div className="container">
      <div className="col-lg-12">
      <div className="card h-100">
        <div className="img-wrapper">
          <img src={image} className="card-img-top" alt={title} />
        </div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text text-muted">{price} USD</p>
          <a href="#" className="btn btn-primary mt-auto">
            Go somewhere
          </a>
        </div>
      </div>
    </div>
    </div>
    
  );
}
