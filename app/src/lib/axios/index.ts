import Axios from "axios";

export const axios = Axios.create({
  baseURL: "http://localhost",
  withCredentials: true,
  withXSRFToken: true,
});
