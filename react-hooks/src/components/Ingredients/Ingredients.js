import React, { useReducer, useMemo, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
import ErrorModel from "./../UI/ErrorModal";
import useHttp from "../../hooks/http";

const ingredientReducer = (currentIng, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIng, action.ingredient];
    case "DELETE":
      return currentIng.filter((ing) => ing.id !== action.id);
    default:
      throw new Error("Should Not get There");
  }
};

function Ingredients() {
  const [ing, dispatchIng] = useReducer(ingredientReducer, []);
  const { isLoading, error, data, sendRequest, reqExtra, identifier, clear } = useHttp();

  useEffect(() => {
    if (!isLoading && !error) {
      if (identifier === "REMOVE_ING") {
        dispatchIng({ type: "DELETE", id: reqExtra });
      } else if (identifier === "ADD_ING" && data) {
        dispatchIng({
          type: "ADD",
          ingredient: { id: data.name, ...reqExtra },
        });
      }
    }
  }, [data, reqExtra, identifier, isLoading, error]);

  // const [ing, setIng] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const addIngredientsHandler = useCallback(
    (ingredient) => {
      sendRequest(
        `https://react-hooks-1bbcf-default-rtdb.firebaseio.com/ingredients.json`,
        "POST",
        JSON.stringify(ingredient),
        ingredient,
        "ADD_ING"
      );
    },
    [sendRequest]
  );

  /*
  const addIngredientsHandler = useCallback((ingredient) => {
    // setIsLoading(true);
    dispatchHttp({ type: "SEND" });
    fetch(
      "https://react-hooks-1bbcf-default-rtdb.firebaseio.com/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingredient),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        dispatchHttp({ type: "RESPONSE" });
        // setIsLoading(false);
        return response.json();
      })
      .then((responseData) => {
        // setIng((prevIng) => [
        //   ...prevIng,
        //   { id: responseData.name, ...ingredient },
        // ]);
        dispatchIng({
          type: "ADD",
          ingredient: { id: responseData.name, ...ingredient },
        });
      })
      .catch((error) => {
        dispatchHttp({ type: "ERROR", errorMsg: error.message });
        // setError(error.message);
        // setIsLoading(false);
      });
  }, []);
  */

  const filteredHandler = useCallback((filterIng) => {
    // setIng(filterIng);
    dispatchIng({ type: "SET", ingredients: filterIng });
  }, []);

  const removeIngHandler = useCallback(
    (id) => {
      sendRequest(
        `https://react-hooks-1bbcf-default-rtdb.firebaseio.com/ingredients/${id}.json`,
        "DELETE",
        null,
        id,
        "REMOVE_ING"
      );
    },
    [sendRequest]
  );

  /*
  const removeIngHandler = useCallback((id) => {
    // setIsLoading(true);
    dispatchHttp({ type: "SEND" });

    fetch(
      `https://react-hooks-1bbcf-default-rtdb.firebaseio.com/ingredients/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        // setIsLoading(false);
        dispatchHttp({ type: "RESPONSE" });
        // setIng(prevIng => prevIng.filter(ingredinet => ingredinet.id !== id));
        dispatchIng({ type: "DELETE", id: id });
      })
      .catch((error) => {
        // setError(error.message);
        dispatchHttp({ type: "ERROR", errorMsg: error.message });
        // setIsLoading(false);
      });
  }, []);
  */

  const ingredientList = useMemo(() => {
    return <IngredientList onRemoveItem={removeIngHandler} ingredients={ing} />;
  }, [ing, removeIngHandler]);

  return (
    <div className="App">
      {error && <ErrorModel onClose={clear}>{error}</ErrorModel>}
      <IngredientForm
        onAddIngredient={addIngredientsHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
