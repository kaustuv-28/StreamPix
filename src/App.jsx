import "./App.css";
import Search from "./components/Search";
import MovieInfo from "./components/MovieInfo";
import SeriesInfo from "./components/SeriesInfo";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/info/movie/:imdbId" element={<MovieInfo />} />
          <Route path="/info/series/:imdbId/" element={<SeriesInfo />} />
          <Route path="/info/series/:imdbId/:season" element={<SeriesInfo />} />
          <Route
            path="/info/series/:imdbId/:season/:episode"
            element={<SeriesInfo />}
          />
          <Route
            path="*"
            element={
              <h1 style={{ justifyContent: "center" }}>Page Not Found :(</h1>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
