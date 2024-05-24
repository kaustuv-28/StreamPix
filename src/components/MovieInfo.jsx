import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "../Info.css";
import { useParams } from "react-router-dom";

function MovieInfo() {
  const movieColor = "#557aa9";
  const seriesColor = "#eb5656";
  const { imdbId } = useParams();
  const [data, setData] = useState({});
  // const VidSrc = "https://vidsrc.icu/embed/movie/" + imdbId;
  const VidSrc = "https://vidsrc.info/player/" + imdbId;
  const options = {
    method: "GET",
    url: "https://www.omdbapi.com/?apikey=98d002bf",
    params: { i: imdbId, plot: "full" },
  };

  useEffect(() => {
    axios.request(options).then(function (response) {
      // handle success
      setData(response.data);
      console.log(response.data);
    });
  }, []);

  return Object.keys(data).length ? (
    <>
      <div className="InfoContainer">
        <div className="stream">
          <iframe
            src={VidSrc}
            allow="fullscreen"
            scrolling="no"
            width="100%"
            height="90%"
            frameBorder="0"
          ></iframe>
        </div>
        <div className="infoData">
          <div
            className="poster"
            style={{ backgroundImage: "url(" + data.Poster + ")" }}
          ></div>
          <div>
            <h1>
              {data.Title}
              <span className="year">({data.Year})</span>
              <span className="rated">{data.Rated}</span>
              <span
                className="rated"
                style={{
                  background: data.Type == "movie" ? movieColor : seriesColor,
                }}
              >
                {data.Type}
              </span>
            </h1>
            {/* <div className="rated"></div> */}
            <div className="imdbRating">
              <div className="stars">
                <div
                  className="bar"
                  style={{
                    width:
                      data.imdbRating == "N/A"
                        ? "45%"
                        : Number(data.imdbRating) * 10 + "%",
                  }}
                ></div>
                <p>{}</p>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
              </div>

              <h4 className="imdbData">
                IMDB: {data.imdbRating}
                <p>({data.imdbVotes})</p>
              </h4>

              <div className="genre">
                {data.Genre.split(",").map(function (item, index) {
                  return (
                    <p key={index} className="genreItem">
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="actors">
              <p>Starring:</p> {data.Actors}
            </div>
            <div className="actors">
              <p>Awards: </p>
              {data.Awards}
            </div>
            <div className="actors">
              <p>Duration: </p>
              {data.Runtime}
            </div>
          </div>
          <div>
            <div className="plot" tabIndex={0}>
              <div className="plotData">
                Plot:- <p>{data.Plot}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    "Loading..."
  );
}

export default MovieInfo;
