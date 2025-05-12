import React, { useEffect, useState } from "react";
import Highlights from "../../components/Highlights/Highlights.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import useAnnonces from "../../hooks/useAnnonces.js";
import useCategories from "../../hooks/useCategories.js";
import Header from "../../components/Header/Header.jsx";
import Loading from "../../components/Loading.jsx"; // Ensure this path is correct

const HomePage = () => {
    const { annoncesData, annonces } = useAnnonces();
    const { categoriesData, categories } = useCategories();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await categories();
                await annonces();
            } catch (error) {
                console.error("Error fetching:", error);
            } finally {
                console.log(annoncesData);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Ensure annoncesData is defined before filtering
    const apartements = annoncesData ? annoncesData.filter(annonce => annonce.category.name === "Apartements") : [];
    const telephone = annoncesData ? annoncesData.filter(annonce => annonce.category.name === "Telephones") : [];
    const voiture = annoncesData ? annoncesData.filter(annonce => annonce.category.name === "Voitures") : [];

    return (
        <>
        <SearchBar />
        <Header />
            {loading ? (
                <Loading />
            ) : (
                <>
                    
                    <Highlights data={apartements} category="Apartements" />
                    <Highlights data={telephone} category="Telephones" />
                    <Highlights data={voiture} category="Voitures" />
                </>
            )}
        </>
    );
};

export default HomePage;