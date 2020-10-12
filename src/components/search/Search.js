import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Search.css";
import Button from "@material-ui/core/Button";

const Search = () => {
  const [searchResults, setSearchResults] = useState();
  const history = useHistory();

  let userIWantToFind;
  const searchUsers = (e) => {
    e.preventDefault();
    axios.get(`/api/users/search/${userIWantToFind}`).then((res) => {
      console.log(res.data);
      setSearchResults(res.data);
    });
  };

  const updateSearchValue = (e) => {
    return (userIWantToFind = e.target.value);
  };

  const goToProfile = async (e) => {
    console.log(e.target.value);
    history.push(`/picks/${e.target.value}`);
  };

  return (
    <section className="search-section">
      <div className="search-container">
        <form onSubmit={searchUsers} className="search">
          <input
            onChange={updateSearchValue}
            type="text"
            className="searchTerm"
            placeholder="Who are you looking for?"
          />
          <button type="submit" className="searchButton">
            Search
          </button>
        </form>
        {searchResults ? (
          <div className="search-card">
            <h4>Name: {searchResults.name}</h4>
            <h4>
              Record: {searchResults.wins} - {searchResults.losses}
            </h4>
            <h4>Win Percentage: {searchResults.winPercentage}</h4>
            <input
              type="submit"
              value={searchResults.username}
              onClick={goToProfile}
              placeholder="Go To Profile"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Search;
