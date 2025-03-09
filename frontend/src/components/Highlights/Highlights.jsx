import React, { useRef, useState } from "react";
import Card from "../Card/Card";
import "./Highlights.css";
import { Link } from "react-router";

const Highlights = ({ data, category }) => {
  // Filter annonces by category
  const annonces = data.filter((annonce) => annonce.category && annonce.category.name === category);

  // Check if there are any annonces in the filtered array
  if (annonces.length === 0) {
    return <p>No annonces found for category {category}.</p>;
  }

  // Get the category ID from the first annonce in the filtered array
  const id_cat = annonces[0].category.id;

  const carouselInnerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    const carouselInner = carouselInnerRef.current;
    const cardWidth = carouselInner.children[0].offsetWidth;

    if (currentIndex < annonces.length - 1) {
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

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Voitures":
        return "bi bi-car-front-fill ms-2";
      case "Apartements":
        return "bi bi-building ms-2";
      case "Telephones":
        return "bi bi-phone ms-2 ";
      default:
        return "";
    }
  };

  return (
    <div className="container">
      <h5 className="d-flex align-items-center">
        Nouvelle Annonces {category}
        <i className={getCategoryIcon(category)}></i>
        <Link to={`/app/annonces/${id_cat}`} className="btn ms-auto">
          En savoir plus
        </Link>
      </h5>

      <div id="carouselExample" className="carousel">
        <div
          className="carousel-inner"
          ref={carouselInnerRef}
          style={{ overflow: "hidden", scrollBehavior: "smooth" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {annonces.slice(0, 10).map((annonce, index) => (
            <div
              key={index}
              className={`carousel-item ${
                index === currentIndex ? "active" : ""
              }`}
            >
              <Card
                username={annonce.user.name}
                timeAgo={annonce.created_at}
                title={annonce.title}
                image={annonce.image}
                price={annonce.price}
                id={annonce.id}
                
              />
            </div>
          ))}
          <div className="carousel-item">
            <Link
              to={`/app/annonces/${id_cat}`}
              className="d-flex justify-content-center align-items-center w-100 h-100"
            >
              En savoir plus
            </Link>
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
          disabled={currentIndex === annonces.length - 1}
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