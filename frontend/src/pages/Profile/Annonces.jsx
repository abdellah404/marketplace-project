import React, { useEffect } from 'react';
import useAnnonces from '../../hooks/useAnnonces';
import useAuth from '../../hooks/useAuth';
import { useParams } from 'react-router';
import Card from '../../components/Card/Card';


const Annonces = () => {
  
      const {getMyAnnonces , myAnnonces  } = useAnnonces();
        const { user } = useAuth(); // Get the authenticated user

    
        useEffect(() => {

            // async function to fetch my annonces
            const fetchMyAnnonces = async () => {
                try {

                    await getMyAnnonces(user.id);
                    console.log(myAnnonces , user.id);
                    
                } catch (error) {
                    console.error("Error fetching my annonces:", error);
                }
            };

            fetchMyAnnonces();            


        }, []);
    
        return (
            <div className="container mt-5 mb-5">
                <div className="row">
                    {myAnnonces && myAnnonces.length > 0 ? (
                        myAnnonces.map((annonce, index) => (
                            <div className="col-md-4 mt-2" key={index}>
                                
                                <Card
                                    username={annonce.user.name}
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
        );

    
};

export default Annonces;