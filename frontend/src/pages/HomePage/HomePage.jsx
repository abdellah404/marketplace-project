import React, { useEffect } from "react";
import Highlights from "../../components/Highlights/Highlights.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import useAnnonces from "../../hooks/useAnnonces.js";
import Header from "../../components/Header/Header.jsx";
const HomePage = () => {
const {annoncesData , annonces } = useAnnonces();

useEffect(() => {
const fetchData = async () => {
try {
await annonces();
console.log(annoncesData); // Handle the data
} catch (error) {
console.error("Error fetching annonces:", error);
}
};

fetchData();
}, []);


const apartements = annoncesData?.filter(annonce => annonce.category === "Appartement") || [];
const telephone = annoncesData?.filter(annonce => annonce.category === "Telephone") || [];
const voiture = annoncesData?.filter(annonce => annonce.category === "Voitures") || [];
console.log(apartements);


return (
<>
    <SearchBar />
    <Header/>
    <Highlights data={apartements} category="Apartement" />
    <Highlights data={telephone} category="Telephone" />
    <Highlights data={voiture} category="Voitures" />


</>
);
};

export default HomePage;
