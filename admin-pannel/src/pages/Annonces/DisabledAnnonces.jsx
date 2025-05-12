import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import Card from "../../components/Card/Card";
import AnnoncesService from "../../services/AnnoncesService";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router";

const DisabledAnnonces = () => {
  const [ disabledAnnonces , setDisabledAnnonces ] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { id } = useParams();
  const user_id = Number(id);

  useEffect(() => {
    const fetchDisabledAnnonces = async () => {
      try {
      const data =  await AnnoncesService.disableAnnonces(user_id);
      setDisabledAnnonces(data.data);
      console.log(disabledAnnonces);
      
      } catch (error) {

        console.error("Error fetching disabled annonces:", error);

      } finally {
        setLoading(false);
      }
    };
    fetchDisabledAnnonces();
  }, [user.id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mt-5">
      {disabledAnnonces && disabledAnnonces.length > 0 ? (
        <div className="row">
          {disabledAnnonces.map((annonce, index) => (
            <div className="col-md-4 mt-2" key={index}>
              <Card
                username={annonce.user.name}
                timeAgo={annonce.created_at}
                title={annonce.title}
                image={annonce.image}
                price={annonce.price}
                id={annonce.id}
                more_options={false}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No disabled annonces found.</p>
      )}
    </div>
  );
};

export default DisabledAnnonces;