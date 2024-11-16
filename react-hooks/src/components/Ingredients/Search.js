import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";
import useHttp from "../../hooks/http";
import ErrorModal from "../UI/ErrorModal";

const Search = React.memo((props) => {
  const { onLoadIngredients } = props;
  const [filter, setFilter] = useState("");
  const inputRef = useRef();
  const debounceTimeout = useRef(null);

  const { isLoading, data, error, sendRequest, clear } = useHttp();

  useEffect(() => {
    if (!isLoading && data && !error) {
      const loadIngredients = [];
      for (let key in data) {
        loadIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
        });
      }
      onLoadIngredients(loadIngredients);
    }
  }, [isLoading, error, data, onLoadIngredients]);

  useEffect(() => {
    // Clear the previous timeout if it exists
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new timeout
    debounceTimeout.current = setTimeout(() => {
      if (filter === inputRef.current.value) {
        const queryParam =
          filter.length === 0 ? "" : `?orderBy="title"&equalTo="${filter}"`;

        sendRequest(
          "https://react-hooks-1bbcf-default-rtdb.firebaseio.com/ingredients.json" +
            queryParam,
          "GET"
        );
        /*
        fetch(
          "https://react-hooks-1bbcf-default-rtdb.firebaseio.com/ingredients.json" + queryParam
        )
        .then((response) => response.json())
        .then((responseData) => {
          const loadIngredients = [];
          for (let key in responseData) {
            loadIngredients.push({
              id: key,
              title: responseData[key].title,
              amount: responseData[key].amount,
            });
          }
          onLoadIngredients(loadIngredients);
        });
        */
      }
    }, 500);

    // Cleanup function to clear the timeout on unmount or before the next render
    return () => {
      clearTimeout(debounceTimeout.current);
    };
  }, [filter, sendRequest, inputRef]);

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading ? <span>Loading....</span> : null}
          <input
            ref={inputRef}
            type="text"
            value={filter}
            onChange={(event) => {
              setFilter(event.target.value);
            }}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
