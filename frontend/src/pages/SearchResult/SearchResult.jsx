import React from "react";
import { useLocation, useNavigate } from "react-router";
import useAnnonces from "../../hooks/useAnnonces";
import Card from "../../components/Card/Card";
import useTheme from "../../hooks/useTheme";
import Loading from "../../components/Loading";
import SearchBar from "../../components/SearchBar/SearchBar";

const SearchResult = () => {
  const { isDarkMode } = useTheme();
  const { annoncesData } = useAnnonces();
  const location = useLocation();
  const navigate = useNavigate();

  // Parse query parameters from URL
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "";

  const filteredAnnonces = annoncesData
    ? annoncesData.filter((annonce) => {
        const matchesQuery =
          annonce.title.toLowerCase().includes(query.toLowerCase()) ||
          (annonce.description &&
            annonce.description.toLowerCase().includes(query.toLowerCase()));
        const matchesCategory = category
          ? annonce.category_id === Number(category)
          : true;
        return matchesQuery && matchesCategory;
      })
    : [];

  if (!annoncesData) {
    return <Loading />;
  }

  return (
    <>
      <SearchBar />
      <div className="container mt-5">
        {/* Back button */}
        <button
          className={`btn mb-4 fs-5 ${isDarkMode ? "btn-outline-light" : "btn-outline-secondary"}`}
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        {/* Display searched text */}
        <h2 className={`mb-4 ${isDarkMode ? "text-light" : "text-dark"} display-6 fw-bold`}>
          Search results for: <span className="text-primary">{`"${query}"`}</span>
        </h2>

        {filteredAnnonces.length > 0 ? (
          <div className="row">
            {filteredAnnonces.map((annonce) => (
              <div className="col-md-4 mt-3" key={annonce.id}>
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
          <p className={`fs-4 ${isDarkMode ? "text-light" : "text-dark"}`}>
            No results found for <span className="fw-bold">"{query}"</span>.
          </p>
        )}
      </div>
    </>
  );
};

export default SearchResult;