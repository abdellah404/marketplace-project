import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import useAnnonces from '../../hooks/useAnnonces';
import { useNavigate } from 'react-router';

const DetailsPage = () => {


    const navigate = useNavigate();
    const { getAnnonceDetails ,AnnonceDetails } = useAnnonces();
    const { id } = useParams();
    const annonce_id = Number(id);
    useEffect(() => {
        const fetchAnnonceDetails = async () => {
            try {
                await getAnnonceDetails(annonce_id);
                console.log("Annonce details fetched successfully:", AnnonceDetails);
            } catch (error) {
                console.error("Error fetching:", error);
            }
        };

        fetchAnnonceDetails();
    }, [annonce_id]);

    const handleBackClick = () => {
        // Task 4: Handle back click
        navigate(-1);
    };


    return (
        <div className="container mt-5">
        <button className="btn btn-secondary mb-3" onClick={handleBackClick}>Back</button>
        <div className="card product-details-card">
            
            <div className="card-body">
                <div className="image-placeholder-large">
                    <img src="https://picsum.photos/200/300"  />
                </div>
            {AnnonceDetails && AnnonceDetails.length > 0 && (
                <div>
                    <h2>{AnnonceDetails[0].title}</h2>
                    <p><strong>Category:</strong> {AnnonceDetails[0].category.name}</p>
                    <p><strong>City:</strong> {AnnonceDetails[0].city}</p>
                    <p><strong>Description:</strong> {AnnonceDetails[0].description}</p>
                    <p><strong>Price:</strong> ${AnnonceDetails[0].price}</p>
                    <p><strong>Posted by:</strong> {AnnonceDetails[0].user.name}</p>
                    <p><strong>Created at:</strong> {new Date(AnnonceDetails[0].created_at).toLocaleDateString()}</p>
                    <p><strong>Updated at:</strong> {new Date(AnnonceDetails[0].updated_at).toLocaleDateString()}</p>
                </div>
            )}
            </div>
        </div>
       
    </div>
    );
};

export default DetailsPage;