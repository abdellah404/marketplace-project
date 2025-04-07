import React, { useEffect } from 'react';
import useAnnonces from '../../hooks/useAnnonces';
import { useParams } from 'react-router';
import Card from '../../components/Card/Card';
import './ShowMoreAnnonces.css'; // Import the custom CSS file

const ShowMoreAnnonces = () => {
    const { AnnoncesCategory, getAnnoncesByCatId } = useAnnonces();
    const { cat_id } = useParams();
    const categoryId = Number(cat_id);

    useEffect(() => {
        // Récupérer les posts de la catégorie
        getAnnoncesByCatId(categoryId)
            .then(response => console.log("Posts fetched successfully:", AnnoncesCategory))
            .catch(error => console.error("Error fetching posts:", error));
    }, [categoryId]);

    return (
        <div className="container">
            <div className="row ">
                {AnnoncesCategory && AnnoncesCategory.length > 0 ? (
                    AnnoncesCategory.map((annonce, index) => (
                        <div className="col-md-4 show-custom-card mt-5 ms-5" key={index}>
                            <Card
                                username={annonce.user.name}
                                timeAgo={annonce.created_at}
                                title={annonce.title}
                                image={annonce.image}
                                price={annonce.price}
                            />
                        </div>
                    ))
                ) : (
                    <p>No annonces found.</p>
                )}
            </div>
        </div>
    );
};

export default ShowMoreAnnonces;