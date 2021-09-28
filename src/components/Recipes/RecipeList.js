import React, { useState, useEffect } from "react";

import RecipeService from "../../services/recipe.service";
import model from "../../models/Recipe";

import DynamicTable from "../Common/DynamicTable";

const Recipes = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    RecipeService.getRecipeList().then(
      (response) => {
        setItems(response);
      },
      (error) => {
        console.log("Error loading Recipes:", error);
        setItems([]);
      }
    );
  }, []);

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const doRemove = async (ids) => {
    console.log("start doRemove:", ids);
    await sleep(5000);
    console.log("removed!!:", ids);
  };

  if (!items.length) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <DynamicTable model={model} items={items} doRemove={doRemove} />
    </>
  );
};

export default Recipes;
