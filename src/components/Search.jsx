import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";
import { useSearchParams } from "react-router-dom";

function Search() {
  const [searchParam, SetSearchParams] = useSearchParams({
    search: "Iron Man",
  });
  const searchQuery = searchParam.get("search");
  const noImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
  const [clicked, setClicked] = useState(false);
  const [m_data, setData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [bgImage, setBgImage] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [m_error, setError] = useState("");

  useEffect(() => {
    const fetchAllPages = async () => {
      for (let i = 0; i < 2; i++) {
        const l_page = pageNum + i;
        const options = {
          method: "GET",
          url: "https://www.omdbapi.com/?apikey=98d002bf",
          params: { s: inputText ? inputText : searchQuery, page: l_page },
        };

        try {
          let response = await axios.request(options);
          console.log(response.data.Response);
          if (response.data.Response === "True") {
            console.log(`Page: ${l_page}, Index: ${i}`);
            setData((m_data) => [...m_data, ...response.data.Search]);
            setBgImage(response.data.Search[0].Poster);
          } else {
            setError(response.data.Error);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchAllPages();
  }, [pageNum, clicked]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight
    ) {
      setPageNum((pageNum) => pageNum + 2);
    }
  };

  function handleClick() {
    SetSearchParams({ search: inputText });
    setData([]);
    setError("");
    setPageNum(1);
    setClicked(!clicked);
    console.log("Clicked");
    console.log(inputText);
  }

  return (
    <>
      <div
        className="bg-image"
        style={{
          backgroundImage: "url(" + (m_data.length ? bgImage : "") + ")",
        }}
      ></div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div>
          <input
            type="text"
            value={inputText}
            name="search"
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            placeholder="Search..."
          />
          <button onClick={handleClick}>
            <i
              className="bx bx-search-alt-2"
              style={{ width: "40px", fontSize: "25px" }}
            ></i>
          </button>
        </div>
      </form>
      <div className="content">
        {m_data.length ? (
          m_data.map(function (item) {
            return (
              <Card
                title={item.Title}
                date={item.Year}
                type={item.Type}
                image={item.Poster == "N/A" ? noImage : item.Poster}
                setImg={setBgImage}
                imdbId={item.imdbID}
                key={item.imdbID}
              />
            );
          })
        ) : m_error ? (
          <p>{m_error} Try Again.</p>
        ) : (
          "Loading..."
        )}
      </div>
    </>
  );
}

export default Search;
