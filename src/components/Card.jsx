import React from "react";
import { Link } from "react-router-dom";
function Card(props) {
  // https://m.media-amazon.com/images/M/MV5BMTg3NTkwNzAxOF5BMl5BanBnXkFtZTcwMjM1NjI5MQ@@._V1_SX300.jpg
  // https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg
  // Title: "Prison Break"
  // Type: "series"
  // Year: "2005–2017"
  const movieColor = "#68b377";
  const seriesColor = "#eb5656";

  return (
    <Link
      to={
        "/info/" + (props.type == "movie" ? "movie/" : "series/") + props.imdbId
      }
    >
      <div
        onMouseEnter={() => {
          props.setImg(props.image);
        }}
        className="Card"
      >
        <span
          style={{
            background: props.type == "movie" ? movieColor : seriesColor,
          }}
        >
          {props.type}
        </span>
        <div className="Card-info">
          <p className="title" style={{ fontWeight: "bold" }}>
            {props.title}
          </p>
          <p>{props.date}</p>
        </div>
        <div
          className="card-image"
          style={{
            backgroundImage: "url(" + props.image + ")",
            width: "100%",
            height: "100%",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
      </div>
    </Link>
  );
}

export default Card;
