import React from "react";
import "../css/Home.css";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

function Home() {
  return (
    <div className="home--container">
      <div className="titulo">
        <p className="titulo--texto">DIGITE</p>
        <p className="titulo--texto-meio">uma</p>
        <p className="titulo--texto">PALAVRA</p>
      </div>
      <div className="search-bar">
        <input
          placeholder="Pesquise aqui"
          className="search--box"
          type="text"
        />
        <Link to="/search">
          <button className="btn--search">
            <BsSearch className="search-icon" />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
