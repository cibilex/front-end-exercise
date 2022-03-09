import axios from "axios";

const myAxios = axios.create();

myAxios.defaults.baseURL = "https://reqres.in"; //for dev mode
export default myAxios;
