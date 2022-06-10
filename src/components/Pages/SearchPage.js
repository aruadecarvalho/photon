import "../css/SearchPage.css";
import "../css/Home.css";
import { BsSearch } from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { useState } from "react";

function SearchPage() {
  // valor input da home
  const params = useParams();
  const inputParam = params.inputParam;

  // valor do input da pagina
  const [inputValue, setInputValue] = useState(inputParam);
  const [timer, setTimer] = useState(null);
  const [userTyping, setUserTyping] = useState(false);

  // handle change do input toda hora
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

  // gera uma nova busca
  function navigateToSearch() {
    document.querySelector(".gallery").innerHTML = "";
    pageCount = 1;
    navigate(`/search/${inputValue}`);
  }

  // inicializa a contagem de páginas
  let pageCount = 1;

  // pega um array de fotos da API baseado no input
  async function SearchPhotos() {
    // valor input da SearchPage
    if (!userTyping) {
      const queryValue = inputParam;
      // pega os dados da API
      console.log("API call");
      console.log(queryValue);
      const response = await fetch(
        `https://pixabay.com/api/?key=27857065-d7810c7abcc7feaee44735907&q=${queryValue
          .toLowerCase()
          .replace(
            " ",
            "+"
          )}&image_type=photo&pretty=true&per_page=30&page=${pageCount}`
      );
      const data = await response.json();
      /***********************
        DISPLAY DAS FOTOS
      ***********************/
      loading(true);
      console.log(data.hits);
      // ! Implementar loader para as fotos aparecerem de uma vez
      const galleryEl = document.querySelector(".gallery");
      data.hits.forEach((photo) => {
        // para cada foto cria uma div
        const imgEl = document.createElement("div");
        // declara os valores dos atributos da <img>
        imgEl.innerHTML = `<img class='gallery--img' alt='${photo.tags}' src=${photo.webformatURL} />`;
        galleryEl.appendChild(imgEl);
      });
      loading(false);
    }
  }

  SearchPhotos();

  // loader
  function loading(param) {
    const loader = document.querySelector(".loader");
    const galleryEl = document.querySelector(".gallery");
    // carregando, loading(true)
    if (param) {
      loader.style.visibility = "visible";
      loader.style.display = "block";
      galleryEl.style.visibility = "hidden";
    }
    // finalizado, loading(false)
    loader.style.visibility = "hidden";
    loader.style.display = "none";
    galleryEl.style.visibility = "visible";
  }

  // aumenta o PageCount para carregar mais fotos
  function handleIncrementPageNumber() {
    pageCount++;
    SearchPhotos();
  }

  // document.addEventListener("keydown", function (event) {
  //   if (event.key === "Enter") {
  //     navigateToSearch();
  //   }
  // });

  // carrega fotos quando o usuário chega no fim da página
  window.addEventListener("scroll", () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.scrollHeight - 10
    ) {
      handleIncrementPageNumber();
    }
  });

  //botao scrolltop
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
        <p className="logo logo-search-page">Photon</p>
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
