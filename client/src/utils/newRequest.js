import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://fiveer-app.onrender.com/api/",
  withCredentials: true,
});

export default newRequest;