import axios from "axios";

const API_URL = "http://localhost/testserver/";

const login = async ({ username, password }) => {
  //console.log("username: ", username);
  //console.log("password: ", password);
  /*const user = {
    id: 1,
    username: "Test",
    email: "test@email.com",
    accessToken: "aaaaaaaaaa",
    roles: ["ROLE_ADMIN"]
  };
  localStorage.setItem("user", JSON.stringify(user));
  return user;*/

  try {
    const response = await axios.post(API_URL + "?a=login", {
      username,
      password
    });
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
      return true;
    }
  } catch (err) {
    console.log("Error login", err);
  }
  return false;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  login,
  logout,
  getCurrentUser
};
