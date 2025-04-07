
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Link, useNavigate } from "react-router";
import useTheme from "../../hooks/useTheme";
import "./Card.css"; // Import your CSS file for custom styles

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
  const { isDarkMode } = useTheme();

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
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
  className="col-lg-12 mb-4"
  onClick={more_options ? null : handleCardClick}
  style={{ cursor: more_options ? "default" : "pointer" }}
>
  <div className={`card h-100 ${isDarkMode ? "bg-dark text-white border-secondary" : ""}`}>
    {/* Card Header */}
    <div className="card-header bg-transparent d-flex align-items-center border-0">
      {/* Remove border using `border-0` */}
      <img
        src="https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png"
        alt="User Icon"
        className={`rounded-circle border ${isDarkMode ? "border-light" : "border-dark"}`}
        style={{ width: "40px", height: "40px", objectFit: "cover" }}
      />
      <div className="ms-2">
        <div className={` ${isDarkMode ? "text-white" : ""}`}>{username}</div>
        <small className={`${isDarkMode ? "text-white-50" : "text-muted"}`}>
          {getTimeAgo(timeAgo)}
        </small>
      </div>

      {/* Dropdown Menu */}
      {more_options && (
        <div className="dropdown ms-auto">
          <button
            className={`btn btn-sm ${isDarkMode ? "text-white" : "text-dark"}`}
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-three-dots"></i>
          </button>
          <ul
            className={`dropdown-menu dropdown-menu-end ${
              isDarkMode ? "bg-dark text-white border-secondary" : "bg-white text-dark"
            }`} // Customize dropdown for dark mode
          >
            <li>
              <Link
                className={`dropdown-item ${isDarkMode ? "text-white" : "text-dark"}`}
                to={`/app/profile/annonces/edit/${id}`}
              >
                <i className="bi bi-pencil me-2"></i> Modifier
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item text-danger"
                to={`/app/annonces/delete/${id}`}
              >
                <i className="bi bi-trash me-2"></i> Delete
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>

    {/* Card Image */}
    <div className=" image-container ratio ratio-4x3">
      <img 
        src={image} 
        className="card-img-top object-fit-cover" 
        alt={title} 
      />
    </div>

    {/* Card Body */}
    <div className="card-body">
      <h5 className={`card-title ${isDarkMode ? "text-white" : ""}`}>
        {truncateText(title, 40)}
      </h5>
      <p className={`card-text ${isDarkMode ? "text-white-50" : "text-muted"}`}>
        {price} DH
      </p>
    </div>
  </div>
</div>
  );
}