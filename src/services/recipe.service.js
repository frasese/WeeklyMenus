//import axios from "axios";

//import authHeader from "./auth-header";

import CommunicationService from "./communication.service";

const API_URL = "http://localhost/testserver/?a=recipe";

const getRecipeList = () => {
  /*return Promise.resolve([
    { key: "a", key: "a", name: "aaa", value: true, email: "aaa@" },
    { key: "e", key: "e", name: "eee", value: false, email: "eee@aa" },
    { key: "i", key: "i", name: "iii", value: true, email: "iii@" }
  ]);*/
  //TODO: Qué pasa si devuelve error??
  /*return axios.get(API_URL + "&key=all", { headers: authHeader() }).then(
    (r) => r.data,
    (e) => e
  );*/
  //return axios.get(API_URL + "?key=all").then((r) => r.data);
  return CommunicationService.doGet(API_URL + "&key=all", null, []);
};

const getRecipe = (key) => {
  /*return Promise.resolve({
    key: key,
    key: key,
    name: "n " + key,
    value: true,
    email: key + "@"
  });*/
  //return axios.get(API_URL + "?key=" + key, { headers: authHeader() });
  //return axios.get(API_URL + "&key=" + key, { headers: authHeader() }).then((r) => r.data);
  return CommunicationService.doGet(API_URL + "&key=" + key, null, {});
};

const postRecipe = (recipe) => {
  return CommunicationService.doPost(API_URL, recipe, null);
  //return Promise.resolve(true);
};

export default {
  getRecipeList,
  getRecipe,
  postRecipe
};
