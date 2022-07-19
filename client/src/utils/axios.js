import axios from "axios";
const customFetch = axios.create({
  baseURL: "/api/v1",
});

//intercept woth the token

//check for unauthorized response
export default customFetch;
