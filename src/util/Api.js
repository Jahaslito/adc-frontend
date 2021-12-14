import axios from "axios";

export const Api = axios.create({
    baseURL: "http://20.102.63.47/api/v1/",
});
