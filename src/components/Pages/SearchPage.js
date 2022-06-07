import "../css/SearchPage.css";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";

function SearchPage() {
  // inicializa a contagem de paginas em 1
  let pageCount = 1;
  // inicializa elementos
  const inputRef = useRef("");

  // pega um array de fotos da API baseado no input
  async function SearchPhotos() {
    // transforma valor do input no formato ('um+dois')
    const queryValue = inputRef.current.value.toLowerCase().replace(" ", "+");
    // pega os dados da API
    console.log(pageCount);
    const response = await fetch(
      `https://pixabay.com/api/?key=27857065-d7810c7abcc7feaee44735907&q=${queryValue}&image_type=photo&pretty=true&per_page=30&page=${pageCount}`
    );
    const data = await response.json();

    /***********************
        DISPLAY DAS FOTOS
    ***********************/
    // ! Implementar loader para as fotos aparecerem de uma vez
    const galleryEl = document.querySelector(".gallery");
    console.log(data.hits);
    data.hits.forEach((photo) => {
      // para cada foto cria uma div
      const imgEl = document.createElement("div");
      // declara os valores dos atributos da <img>
      imgEl.innerHTML = `<img class='gallery--img' alt='${photo.tags}' src=${photo.largeImageURL} />`;
      galleryEl.appendChild(imgEl);
    });
  }

  // aumenta o PageCount para carregar mais fotos
  function handleIncrementPageNumber() {
    pageCount++;
    SearchPhotos();
  }

  // inicializa uma nova pesquisa
  function NewSearch() {
    // limpa a pagina para nova pesquisa, se o input estiver vazio
    document.querySelector(".gallery").innerHTML = "";
    SearchPhotos();
  }

  // mostra fotos quando enter é pressionado
  document.addEventListener("keydown", (event) => {
    let keyName = event.key;
    if (keyName === "Enter") {
      SearchPhotos();
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
          ref={inputRef}
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
