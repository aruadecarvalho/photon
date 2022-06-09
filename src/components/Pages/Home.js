import "../css/Home.css";
import "../css/SearchPage.css";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import bgImg from "../img/bg-img.jpg";
function Home() {
  const [inputValueData, setInputValueData] = useState(null);

  function handleInputChange(event) {
    setInputValueData(event.target.value);
  }

  return (
    <div className="home--container">
      <img className="img--background" alt="montanhas" src={bgImg} />

      <div className="logo--container">
        <p className="logo">Photon</p>
      </div>
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
          onChange={handleInputChange}
        />
        <Link to="/search" state={{ inputValueHome: `${inputValueData}` }}>
          <button className="btn--search">
            <BsSearch className="search-icon" />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
