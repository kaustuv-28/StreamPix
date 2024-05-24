import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "../Info.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SeriesInfo() {
  const navigate = useNavigate();

  const movieColor = "#557aa9";
  const seriesColor = "#eb5656";
  const [totalSeasons, SetTotalSeasons] = useState([]);
  const { imdbId, season = "1", episode = "1" } = useParams();
  const [disableEpisodes, setDisableEpisodes] = useState(false);
  const [allEpisode, SetAllEpisodes] = useState([]);
  const [data, setData] = useState({});
  const [selectedSeason, SetSelectedSeason] = useState("");
  const [disableBoth, SetDisableBoth] = useState(false);
  const [errorResposnse, setErrorResponse] = useState("");
  // const VidSrc = "https://vidsrc.icu/embed/movie/" + imdbId;
  //   var VidSrc = "https://vidsrc.info/player/" + imdbId;
  var options = {
    method: "GET",
    url: "https://www.omdbapi.com/?apikey=98d002bf",
    params: {
      i: imdbId,
      plot: "full",
      Season: season,
      Episode: episode,
    },
  };

  useEffect(() => {
    options.params = {
      i: imdbId,
      Season: season,
      Episode: episode,
    };
    axios.request(options).then(function (response) {
      // handle success
      console.log(response.data);
      if (response.data.Response == "False") {
        console.log(
          `Response Error, data lenght: ${Object.keys(response.data).length}`
        );
        setErrorResponse(response.data.Error);
      } else {
        setData(response.data);
        console.log(
          `Response Good, data lenght: ${Object.keys(response.data).length}`
        );
      }
      //   console.log(response.data);
      SetDisableBoth(false);
    });

    options.params = { i: imdbId, Season: season };
    axios.request(options).then(function (response) {
      // handle success
      //   setData(response.data);
      var arr = [];
      for (let i = 1; i <= Number(response.data.totalSeasons); i++) {
        arr.push(i);
      }
      SetAllEpisodes(response.data.Episodes);
      setDisableEpisodes(false);
      SetTotalSeasons(arr);
    });
  }, [episode, season]);

  useEffect(() => {
    if (selectedSeason) {
      options.params = { i: imdbId, Season: selectedSeason };
      axios.request(options).then(function (response) {
        // handle success
        //   setData(response.data);
        SetAllEpisodes(response.data.Episodes);
        console.log(response.data.Episodes);
        setDisableEpisodes(false);
      });
    }
  }, [selectedSeason]);

  return Object.keys(data).length > 3 ? (
    <>
      <div className="InfoContainer">
        <div className="stream">
          <iframe
            src={`https://vidsrc.info/player/${data.imdbID}`}
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
            <div className="dropdowns">
              {totalSeasons.length ? (
                <select
                  disabled={disableBoth}
                  onChange={(e) => {
                    console.log(e.target.value);
                    SetSelectedSeason(e.target.value);
                    setDisableEpisodes(true);
                  }}
                  name="pets"
                  id="pet-select"
                >
                  {totalSeasons.map((item) => {
                    return (
                      <option selected={item == season} key={item} value={item}>
                        Season: {item}
                      </option>
                    );
                  })}
                </select>
              ) : (
                ""
              )}
              <select
                onChange={(e) => {
                  console.log(e.target.value);
                  if (e.target.value != -1) {
                    navigate(
                      `/info/series/${imdbId}/${selectedSeason || 1}/${
                        e.target.value
                      }`
                    );
                    SetDisableBoth(true);
                    SetSelectedSeason("");
                  }
                }}
                disabled={disableEpisodes || disableBoth}
                name="pets"
                id="pet-select"
              >
                <option value={-1}>Select Episode</option>
                {allEpisode.length
                  ? allEpisode.map((item) => {
                      return (
                        <option
                          selected={item.Episode == episode && !selectedSeason}
                          key={item.imdbID}
                          value={item.Episode}
                        >
                          {item.Episode}:{" "}
                          {item.Title.length > 10
                            ? `${item.Title.slice(0, 10)}...`
                            : item.Title}
                        </option>
                      );
                    })
                  : ""}
              </select>
            </div>
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
  ) : errorResposnse ? (
    <h1 style={{ justifyContent: "center" }}>{errorResposnse}</h1>
  ) : (
    "Loading..."
  );
}

export default SeriesInfo;
