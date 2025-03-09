import React, { useEffect } from "react";
import Highlights from "../../components/Highlights/Highlights.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import useAnnonces from "../../hooks/useAnnonces.js";
import Header from "../../components/Header/Header.jsx";
import useCategories from "../../hooks/useCategories.js";
const HomePage = () => {
const {annoncesData , annonces } = useAnnonces();
const {categoriesData , categories} = useCategories();

useEffect(() => {
const fetchData = async () => {
try {
await categories();
await annonces();

} catch (error) {
console.error("Error fetching:", error);
}finally {
console.log(annoncesData);

}
};

fetchData();
}, []);

const apartements = annoncesData.filter(annonce => annonce.category.name === "Apartements");
const telephone = annoncesData.filter(annonce => annonce.category.name === "Telephones");
const voiture = annoncesData.filter(annonce => annonce.category.name === "Voitures");




return (
<>
    <SearchBar />
    <Header />
    <Highlights data={apartements} category="Apartements"  />
    <Highlights data={telephone} category="Telephones" />
    <Highlights data={voiture} category="Voitures" />


</>
);
};

export default HomePage;
