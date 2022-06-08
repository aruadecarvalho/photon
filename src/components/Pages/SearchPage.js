import "../css/SearchPage.css";
import "../css/Home.css";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useLocation } from "react-router-dom";

function SearchPage() {
  // valor input da home
  const location = useLocation();
  const { inputValueHome } = location.state;

  // inicializa a contagem de páginasd
  let pageCount = 1;

  // pega um array de fotos da API baseado no input oi dhsfua
  async function SearchPhotos() {
    // valor input da SearchPage
    const inputValueData = document.querySelector(".search--box").value;
    const queryValue =
      inputValueData === null ? inputValueHome : inputValueData;
    console.log(pageCount);
    // pega os dados da API
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
    // ! Implementar loader para as fotos aparecerem de uma vez
    const galleryEl = document.querySelector(".gallery");
    data.hits.forEach((photo) => {
      // para cada foto cria uma div
      const imgEl = document.createElement("div");
      // declara os valores dos atributos da <img>
      imgEl.innerHTML = `<img class='gallery--img' alt='${photo.tags}' src=${photo.largeImageURL} />`;
      galleryEl.appendChild(imgEl);
    });
  }

  SearchPhotos();

  // aumenta o PageCount para carregar mais fotos
  function handleIncrementPageNumber() {
    pageCount++;
    SearchPhotos();
  }

  // inicializa uma nova pesquisa
  function NewSearch() {
    // limpa a pagina para nova pesquisa, se o input estiver vazio
    document.querySelector(".gallery").innerHTML = "";
    pageCount = 1;
    SearchPhotos();
  }

  // mostra fotos quando enter é pressionado
  document.addEventListener("keydown", (event) => {
    let keyName = event.key;
    if (keyName === "Enter") {
      NewSearch();
    }
  });

  // carrega fotos quando o usuário chega no fim da página
  window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      handleIncrementPageNumber();
    }
  });

  return (
    <div className="search-page--container">
      {/* Adicionar LOGO */}
      {/* Adicionar DIV com background linear gradient (igual o design) */}
      <div className="search-bar search-page-padding-input">
        <input
          className="search--box"
          placeholder="Pesquise aqui"
          type="text"
        />
        <button className="btn--search" onClick={NewSearch}>
          <BsSearch className="search-icon" />
        </button>
      </div>
      {/* Implementar botão que de scroll para o top da página */}
      <div className="gallery"></div>
    </div>
  );
}

export default SearchPage;
