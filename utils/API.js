import axios from "axios";

export default axios.create({
  baseURL: "https://trello-purrweb.herokuapp.com/",
  responseType: "json",
  headers: { "Access-Control-Allow-Origin": "*" }
});
