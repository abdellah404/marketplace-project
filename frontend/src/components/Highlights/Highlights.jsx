import React, { useRef, useState } from "react";
import Card from "../Card/Card";
import "./Highlights.css";

const Highlights = (data) => {
  const carouselInnerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    {
      title: "Card title 1",
      description: "Some quick example text to build .",
      image:
       "https://media.istockphoto.com/id/1138251272/photo/smartphones-on-the-counter-of-a-electronics-store.jpg?s=1024x1024&w=is&k=20&c=U-Q8KSUWYxZxmOdk9KoN5sn_VOsshsjCW98CJ2EQDT0=",
      price: "1000",
    },
    {
      title: "Card title 2",
      description: "Some quick example text to ",
      image:
      "https://media.istockphoto.com/id/1138251272/photo/smartphones-on-the-counter-of-a-electronics-store.jpg?s=1024x1024&w=is&k=20&c=U-Q8KSUWYxZxmOdk9KoN5sn_VOsshsjCW98CJ2EQDT0=",
      price: "1000",
    },
    {
      title: "Card title 3",
      description: "Some quick example text to build .",
      image:
      "https://media.istockphoto.com/id/1138251272/photo/smartphones-on-the-counter-of-a-electronics-store.jpg?s=1024x1024&w=is&k=20&c=U-Q8KSUWYxZxmOdk9KoN5sn_VOsshsjCW98CJ2EQDT0=",
      price: "1000",
    },
    {
      title: "Card title 4",
      description: "Some quick example text to build ",
      image:
      "https://media.istockphoto.com/id/1138251272/photo/smartphones-on-the-counter-of-a-electronics-store.jpg?s=1024x1024&w=is&k=20&c=U-Q8KSUWYxZxmOdk9KoN5sn_VOsshsjCW98CJ2EQDT0=",
      price: "1000",
    },

    {
      title: "Card title 4",
      description: "Some quick example text to build",
      image:
      "https://media.istockphoto.com/id/1138251272/photo/smartphones-on-the-counter-of-a-electronics-store.jpg?s=1024x1024&w=is&k=20&c=U-Q8KSUWYxZxmOdk9KoN5sn_VOsshsjCW98CJ2EQDT0=",
      price: "1000",
    },
  ];

  const handleNext = () => {
    const carouselInner = carouselInnerRef.current;
    const cardWidth = carouselInner.children[0].offsetWidth;

    if (currentIndex < cards.length - 1) {
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
      {/* <h5 class="d-flex align-items-center">
        Nouvelle Annonces d'appartement
        <a href="#" class="btn ms-auto">
          En savoir plus
        </a>
      </h5> */} 

      <div id="carouselExample" className="carousel">
        <div
          className="carousel-inner"
          ref={carouselInnerRef}
          style={{ overflow: "hidden", scrollBehavior: "smooth" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className={`carousel-item ${
                index === currentIndex ? "active" : ""
              }`}
            >
              <Card
                title={card.title}
                description={card.description}
                image={card.image}
                price={card.price}
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
          disabled={currentIndex === cards.length - 1}
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
