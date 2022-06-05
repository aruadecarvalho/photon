import "./SearchPage.css";
import { useRef } from "react";

function SearchPage() {
  const inputRef = useRef(null);

  async function SearchPhotos() {
    const queryValue = inputRef.current.value;
    console.log(queryValue);
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${queryValue}&per_page=12`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization:
            "563492ad6f91700001000001447a191a486c49e9a7d681ccd8596593",
        },
      }
    );
    const galleryEl = document.querySelector(".gallery");
    galleryEl.innerHTML = "";
    const data = await response.json();
    console.log(data);
    data.photos.forEach((photo) => {
      const imgEl = document.createElement("div");
      console.log(photo);
      imgEl.innerHTML = `<img class='gallery--img' src=${photo.src.large} />`;
      galleryEl.appendChild(imgEl);
    });

    document.addEventListener("keydown", (event) => {
      let keyName = event.key;
      if (keyName === "Enter") {
        SearchPhotos();
      }
    });
  }

  return (
    <div>
      <input class="form-control form-control-lg" type="text"  ref={inputRef} />
      <button  onClick={SearchPhotos}>Search</button>
      <div className="gallery"></div>
    </div>
  );
}

export default SearchPage;
