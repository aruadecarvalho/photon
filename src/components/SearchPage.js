import "./SearchPage.css";
import { useRef, useState } from "react";

function SearchPage() {
  const [pageCount, setPageCount] = useState(1);
  // set input to null
  const inputRef = useRef("");

  // display photos when enter is pressed
  document.addEventListener("keydown", (event) => {
    let keyName = event.key;
    if (keyName === "Enter") {
      SearchPhotos();
    }
  });

  function handleIncrementPageNumber() {
    setPageCount((prevValue) => prevValue + 1);
    SearchPhotos();
  }

  // window.addEventListener('scroll', () => {
  //   console.log('scrolled');
  // })

  // search for photos based on the user input
  async function SearchPhotos() {
    // get user input value
    const queryValue = inputRef.current.value.split(" ");
    const galleryEl = document.querySelector(".gallery");
    // galleryEl.innerHTML = "";
    //await response of fetch call
    const response = await fetch(
      `https://pixabay.com/api/?key=27857065-d7810c7abcc7feaee44735907&q=${queryValue.join(
        "+"
      )}&image_type=photo&pretty=true&per_page=24&page=${pageCount}`
    );
    // only proceed once promise is resolved
    const data = await response.json();

    data.hits.forEach((photo) => {
      const imgEl = document.createElement("div");
      imgEl.innerHTML = `<img class='gallery--img' alt='${photo.tags}' src=${photo.largeImageURL} />`;
      galleryEl.appendChild(imgEl);
    });
  }

  return (
    <div>
      <input className="search--box" type="text" ref={inputRef} />
      <button onClick={SearchPhotos}>Search</button>
      <div className="gallery"></div>
      <button onClick={handleIncrementPageNumber}>More</button>
    </div>
  );
}

export default SearchPage;
