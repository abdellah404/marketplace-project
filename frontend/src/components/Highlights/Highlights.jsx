import React, { useRef, useState } from "react";
import Card from "../Card/Card";
import "./Highlights.css";
import useAuth from "../../hooks/useAuth";
import { use } from "react";
const Highlights = ({ data, category }) => {
  const carouselInnerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!data || !Array.isArray(data) || data.length < 2 ) {

    return ;
  }
   

  const handleNext = () => {
    const carouselInner = carouselInnerRef.current;
    const cardWidth = carouselInner.children[0].offsetWidth;

    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
      carouselInner.scrollTo({
        left: (currentIndex + 1) * cardWidth,
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    const carouselInner = carouselInnerRef.current;
    const cardWidth = carouselInner.children[0].offsetWidth;

    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      carouselInner.scrollTo({
        left: (currentIndex - 1) * cardWidth,
        behavior: "smooth",
      });
    }
  };

  const handleTouchStart = (e) => {
    const touchStartX = e.touches[0].clientX;
    carouselInnerRef.current.startX = touchStartX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = carouselInnerRef.current.startX - touchEndX;

    if (deltaX > 50) {
      handleNext(); // Swipe left to go to the next card
    } else if (deltaX < -50) {
      handlePrev(); // Swipe right to go to the previous card
    }
  };

  return (
    <div className="container">
      <h5 className="d-flex align-items-center">
        Nouvelle Annonces {category}
        <a href="#" className="btn ms-auto">
          En savoir plus
        </a>
      </h5>

      <div id="carouselExample" className="carousel">
        <div
          className="carousel-inner"
          ref={carouselInnerRef}
          style={{ overflow: "hidden", scrollBehavior: "smooth" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {data.map((annonce, index) => (
            <div
              key={index}
              className={`carousel-item ${
                index === currentIndex ? "active" : ""
              }`}
            >
              <Card
              username= {annonce.user.name}
              timeAgo={annonce.created_at}
                title={annonce.title}
                image={annonce.image}
                price={annonce.price}
              />
            </div>
          ))}

          <div className="carousel-item">
            <a
              href="#"
              className="d-flex justify-content-center align-items-center w-100 h-100"
            >
              En savoir plus
            </a>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          onClick={handleNext}
          disabled={currentIndex === data.length - 1}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Highlights;
