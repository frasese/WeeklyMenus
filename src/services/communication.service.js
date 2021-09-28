import axios from "axios";
import { navigate } from "@reach/router";

import authHeader from "./auth-header";

const handleError = (e, onErrorValue) => {
  if (e.response.data?.error === "Invalid token found") {
    localStorage.removeItem("user");
    navigate("/login");
  }

  console.log(
    "commnunication.service -> Error detected: " + e.response.data?.error
  );

  if (onErrorValue === null) {
    throw e.response.data;
    //throw e;
  }
  return onErrorValue ? onErrorValue : e;
};

const doGet = async (URL, data = "", onErrorValue) => {
  if (data) {
    URL += (URL.includes("?") ? "&" : "?") + JSON.stringify(data);
  }
  try {
    const response = await axios.get(URL, { headers: authHeader() });
    return response.data;
  } catch (err) {
    return handleError(err, onErrorValue);
  }
};

const doPost = async (URL, data, onErrorValue) => {
  try {
    const response = await axios.post(URL, data, { headers: authHeader() });
    return response.data;
  } catch (err) {
    return handleError(err, onErrorValue);
  }
};

export default {
  doGet,
  doPost
};
