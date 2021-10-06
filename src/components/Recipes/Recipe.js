import React, { useState, useEffect } from "react";

import DynamicForm from "../Common/DynamicForm";

import RecipeService from "../../services/recipe.service";
import model from "../../models/Recipe";

const Recipe = (props) => {
  const [recipe, setRecipe] = useState({});
  const [error, setError] = useState("");
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

  /*const handleSubmit = (values) => {
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
  };*/
  const handleSubmit = async (values) => {
    try{
      const response = await RecipeService.postRecipe(recipe);
      console.log("POST response: ",response);
      setRecipe(response);
      props.navigate('../');
    } catch(err) {
        console.log("AQUÍ NO DEBERÍA LLEGAR NUNCA");
        console.dir(err);
        //console.log("AQUÍ NO DEBERÍA LLEGAR NUNCA -> POST error: ",err.response.data?.error);
        const _content =
          (err.response &&
           err.response.data &&
           err.response.data.error) ||
          err.message ||
          err.toString();
      setError(err);
    }
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
