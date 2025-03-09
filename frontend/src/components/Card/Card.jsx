import React from "react";
import "./Card.css";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Navigate , useNavigate } from "react-router";

export default function Card({ title, id, image, price , timeAgo , username }) {

  const navigate = useNavigate();
  // Fonction pour ajouter du texte si le titre est trop court
  
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const handleCardClick = () => {
    navigate(`/app/annonces/details/${id}`);
    
  };



const getTimeAgo = (dateString) => {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: fr });
};



  return (
    <div className="col-lg-12 d-flex"
    onClick={handleCardClick}
    style={{ cursor: "pointer" }}
    role="button" // Pour l'accessibilité
    
    >
      <div className="card h-100 d-flex flex-column">
      <div className="container d-flex align-items-center mt-3">
      <img  src="https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png" alt="User Icon" className="user-icon" />
      <div>
            <div className="username">{username}</div>
            <small className="text-muted">{getTimeAgo(timeAgo)}</small>
          </div>
  </div>
        <div className="image-container">
          
          <img src="https://picsum.photos/200/300" className="card-img-top" alt={title} />
        </div>
        <div className="card-body d-flex flex-column">
          {/* Titre avec la logique d'ajout de texte si nécessaire */}
          <h5 className="card-title">{truncateText(title, 40)}</h5> {/* Limit title to 20 chars */}
          {/* Style CSS pour limiter à 2 lignes et ajouter des points de suspension si nécessaire */}
          <p className="card-text text-muted">{price} DH</p>
        </div>
      </div>
    </div>
  );
}
