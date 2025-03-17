import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAnnonces from "../../hooks/useAnnonces";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

const DetailsPage = () => {
  const navigate = useNavigate();
  const { getAnnonceDetails, AnnonceDetails } = useAnnonces();
  const { id } = useParams();
  const annonce_id = Number(id);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchAnnonceDetails = async () => {
      try {
        await getAnnonceDetails(annonce_id);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchAnnonceDetails();
  }, [annonce_id]);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const getTimeAgo = (dateString) => {
    return formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
      locale: fr,
    });
  };

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={handleBackClick}>
        ← Retour
      </button>

      {AnnonceDetails && AnnonceDetails.length > 0 && (
        <div className="card shadow-sm p-3">
          <div className="row">
            {/* Images de l'annonce */}
            <div className="col-md-6">
              <div className="d-flex">
                <img
                  src="https://picsum.photos/500/300"
                  className="img-fluid rounded me-2"
                  alt="Annonce"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>

            {/* Détails de l'annonce */}
            <div className="col-md-6 d-flex flex-column justify-content-between">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="fw-bold">{AnnonceDetails[0].title}</h2>
                <button
                  className="btn btn-link p-0"
                  onClick={handleFavoriteClick}
                  style={{ color: isFavorite ? "red" : "gray" }}
                >
                  <i
                    className={`bi ${
                      isFavorite ? "bi-heart-fill" : "bi-heart"
                    } fs-4`}
                  ></i>
                </button>
              </div>

              <div>
                <p className="text-muted">
                  {AnnonceDetails[0].city} -{" "}
                  {getTimeAgo(AnnonceDetails[0].created_at)}
                </p>
                <h3 className="text-primary fw-bold">
                  {AnnonceDetails[0].price.toLocaleString()} DH
                </h3>
                <p>{AnnonceDetails[0].description}</p>
              </div>

              {/* Informations du vendeur */}
              <div className="d-flex align-items-center border-top pt-3">
                <img
                  src="https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png"
                  alt="User Icon"
                  className="rounded-circle me-2"
                  style={{ width: "50px", height: "50px" }}
                />
                <div>
                  <div className="fw-bold">{AnnonceDetails[0].user.name}</div>
                  <a href="#" className="text-decoration-none">
                    Voir la boutique
                  </a>
                </div>

                {/* Boutons de contact */}
                <div className="d-flex justify-content-end ms-auto">
                  <button className="btn btn-outline-warning  me-2">
                    <i class="bi bi-chat"></i>{" "}
                  </button>
                  <button className="btn btn-primary me-2">
                    <i className="bi bi-telephone"></i> Appeler
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
