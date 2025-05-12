import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Card from "../../components/Card/Card";
import axioService from "../../services/api";
import { Link, useParams } from "react-router";
import Loading from "../../components/Loading";

const Annonces = () => {
  const { user } = useAuth(); 
  const [userAnnonces, setUserAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const user_id = Number(id);

  const fetchMyAnnonces = async () => {
    try {
      setLoading(true);
      const response = await axioService.get(`/annonces/myannonces/${user_id}`);
      const annonces = response.data.data;
      setUserAnnonces(annonces);
    } catch (error) {
      console.error("Error fetching my annonces:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyAnnonces();
    // console.log("userAnnonces", userAnnonces);
  }, [user?.id]);

  if (loading) return <Loading/>;

  return (


<>
<div className="d-flex justify-content-end mb-4">
      <div className="dropdown">
        <button
          className="btn btn-outline-primary dropdown-toggle"
          type="button"
          id="annonceDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Gérer les annonces
        </button>
        <ul className="dropdown-menu" aria-labelledby="annonceDropdown">
          <li>
            <button className="dropdown-item active" type="button">
              Active annonces
            </button>
          </li>
          <li>
            <Link
              className="dropdown-item"
              to={`/admin/annonces/disabled/${user_id}`}
            >
              Disabled annonces
            </Link>
          </li>
        </ul>
      </div>
    </div>


<div className="container mt-5 mb-5">
  
      <div className="row">
        {userAnnonces && userAnnonces.length > 0 ? (
          userAnnonces.map((annonce, index) => (
            <div className="col-md-4 mt-2" key={index}>
              <Card
                username={annonce.user?.name}
                timeAgo={annonce.created_at}
                title={annonce.title}
                image={annonce.image}
                price={annonce.price}
                id={annonce.id}
                more_options={true}
              />
            </div>
          ))
        ) : (
          <p>No annonces found.</p>
        )}
      </div>
    </div>
</>
    
    
  );
};

export default Annonces;