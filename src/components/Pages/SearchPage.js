import "../css/SearchPage.css";
import "../css/Home.css";
import { BsSearch } from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { useState, useEffect } from "react";

function SearchPage() {
  const params = useParams();
  const inputParam = params.inputParam;

  const [inputValue, setInputValue] = useState(inputParam);
  const [timer, setTimer] = useState(null);
  const [userTyping, setUserTyping] = useState(false);
  const [pageCount, setPageCount] = useState(1);

  function handleChange(e) {
    setInputValue(e.target.value);
    setUserTyping(true);
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      setUserTyping(false);
    }, 1000);
    setTimer(newTimer);
  }

  let navigate = useNavigate();

  function navigateToSearch() {
    document.querySelector(".gallery").innerHTML = "";
    setPageCount(1);
    navigate(`/search/${inputValue}`);
  }

  function navigateToHome() {
    document.querySelector(".gallery").innerHTML = "";
    setPageCount(1);
    navigate("/");
  }

  async function SearchPhotos() {
    if (!userTyping) {
      console.log("API call");
      console.log(inputParam);
      const response = await fetch(
        `https://pixabay.com/api/?key=27857065-d7810c7abcc7feaee44735907&q=${inputParam
          .toLowerCase()
          .replace(
            " ",
            "+"
          )}&image_type=photo&pretty=true&per_page=30&page=${pageCount}`
      );
      const data = await response.json();

      loading(true);
      console.log(pageCount);
      const galleryEl = document.querySelector(".gallery");
      data.hits.forEach((photo) => {
        const imgEl = document.createElement("div");
        imgEl.innerHTML = `<img class='gallery--img' alt='${photo.tags}' src=${photo.webformatURL} />`;
        galleryEl.appendChild(imgEl);
      });
      loading(false);
    }
  }

  useEffect(() => {
    SearchPhotos();
  }, [inputParam, pageCount]);

  function loading(param) {
    const loader = document.querySelector(".loader");
    const galleryEl = document.querySelector(".gallery");
    if (param) {
      loader.style.visibility = "visible";
      loader.style.display = "block";
      galleryEl.style.visibility = "hidden";
    }
    loader.style.visibility = "hidden";
    loader.style.display = "none";
    galleryEl.style.visibility = "visible";
  }

  const incrementCount = () => setPageCount(pageCount + 1);

  window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      incrementCount();
    }
  });

  function scrollWin() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="search-page--container">
      <div className="gradient-top--container"></div>
      <div className="logo--container-search-page">
        <p className="logo logo-search-page" onClick={navigateToHome}>
          Photon
        </p>
      </div>
      <div className="search-bar search-page-padding-input search-bar--search-page">
        <input
          className="search--box"
          placeholder="Pesquise aqui"
          type="text"
          value={inputValue}
          onChange={handleChange}
        />
        <button className="btn--search" onClick={navigateToSearch}>
          <BsSearch className="search-icon" />
        </button>
      </div>
      <div className="loader">
        <Oval height="100" width="100" color="grey" ariaLabel="loading" />
      </div>
      <div className="gallery"></div>
      <button className="scrolltop" onClick={scrollWin}></button>
    </div>
  );
}

export default SearchPage;
