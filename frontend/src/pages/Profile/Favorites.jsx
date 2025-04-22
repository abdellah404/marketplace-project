import React, { useEffect } from 'react';
import useAnnonces from '../../hooks/useAnnonces';
import useAuth from '../../hooks/useAuth';
import { useParams } from 'react-router';
import Card from '../../components/Card/Card';
import useFavorites from '../../hooks/useFavorites';
import Annonces from './Annonces';


const Favorites = () => {
  
      const {favorites , getFavorites  } = useFavorites();

    
        useEffect(() => {

            // async function to fetch my annonces
            
            const fetchMyFavoriteAnnonces = async () => {
                try {

                    await getFavorites();
                    console.log(favorites);
                    
                } catch (error) {
                    console.error("Error fetching my annonces:", error);
                }
            };

            fetchMyFavoriteAnnonces();            


        }, []);
    
        return (
            <div className="container mt-5 mb-5">
                <div className="row">
                    {favorites && favorites.length > 0 ? (
                        favorites.map((favorite, index) => (
                            <div className="col-md-4 mt-2" key={index}>
                                
                                <Card
                                    username={favorite.annonce.user.name}
                                    timeAgo={favorite.annonce.created_at}
                                    title={favorite.annonce.title}
                                    image={favorite.annonce.image}
                                    price={favorite.annonce.price}
                                    id={favorite.annonce.id}
                                    more_options={false} 
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

export default Favorites;