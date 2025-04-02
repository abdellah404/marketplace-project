import React from "react";
import "./Card.css";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Link, useNavigate } from "react-router";

export default function Card({
  title,
  id,
  image,
  price,
  timeAgo,
  username,
  more_options,
}) {
  const navigate = useNavigate();

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const handleCardClick = () => {
    navigate(`/app/annonces/details/${id}`);
  };

  const getTimeAgo = (dateString) => {
    return formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
      locale: fr,
    });
  };

  return (
    <div
      className="col-lg-12 d-flex"
      onClick={more_options ? null : handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <div className="card h-100 d-flex flex-column">
        <div className="container d-flex align-items-center mt-3">
          <img
            src="https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png"
            alt="User Icon"
            className="user-icon"
          />
          <div>
            <div className="username">{username}</div>
            <small className="text-muted">{getTimeAgo(timeAgo)}</small>
          </div>
          

          {/* Dropdown for more options */}

          { more_options && (
            <div className="dropdown ms-auto">
              <button
                className="btn btn-transparent"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-three-dots"></i>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
              >
                <li>
                  <Link className="dropdown-item" to={`/app/annonces/edit/${id}`}>
                    <i className="bi bi-pencil me-2"></i> Modifier
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item text-danger"  to={`/app/annonces/delete/${id}`} >
                    <i className="bi bi-trash me-2"></i> Delete
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="image-container">
          <img
            src="https://picsum.photos/200/300"
            className="card-img-top"
            alt={title}
          />
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{truncateText(title, 40)}</h5>
          <p className="card-text text-muted">{price} DH</p>
        </div>
      </div>
    </div>
  );
}