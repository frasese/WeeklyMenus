import React, { useState, useEffect } from "react";

import RecipeService from "../../services/recipe.service";
import model from "../../models/Recipe";

import DynamicForm from "../Common/DynamicForm";

const Recipe = (props) => {
  const [recipe, setRecipe] = useState({});
  const submitText = props.recipeId === ":new" ? "Crear" : "Guardar";

  useEffect(() => {
    if (props.recipeId !== ":new") {
      RecipeService.getRecipe(props.recipeId).then(
        (response) => {
          setRecipe(response);
        },
        (error) => {
          console.log("Error loading Recipe (" + props.recipeId + "):", error);
        }
      );
    }
  }, [props.recipeId]);

  const handleSubmit = (values) => {
    //event.preventDefault();

    console.log("Data:", recipe);
    RecipeService.postRecipe(recipe).then(
      (response) => {
        console.log("response:", response);
        //setRecipe(response.data);
      },
      (error) => {
        console.log(`Error saving Recipe (${props.recipeId}):`, error);
      }
    );
  };

  if (props.recipeId !== ":new" && !recipe) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <DynamicForm
        model={model}
        item={recipe}
        setItem={setRecipe}
        handleSubmit={handleSubmit}
        submitText={submitText}
      />
    </>
  );
};

export default Recipe;
