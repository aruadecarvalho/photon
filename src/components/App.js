import "./App.css";

function App() {
  return (
    <div className="home--container">
      <div className="titulo">
        <p className="titulo--texto">DIGITE</p>
        <p className="titulo--texto-meio">uma</p>
        <p className="titulo--texto">PALAVRA</p>
      </div>
      <div className="input--container">
        <input
          placeholder="Pesquise aqui"
          className="search--box"
          type="text"
        />
      </div>
    </div>
  );
}

export default App;
