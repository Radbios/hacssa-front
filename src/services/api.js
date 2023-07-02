import axios from "axios";

const api = axios.create({
    baseURL: "http://hacssa-app.test/",
});

export default api;