import axios from "axios";

const http={
    get:axios.get,
    post:axios.post,
    delete:axios.delete,
    update:axios.patch,
    patch:axios.patch,
    host:"https://localhost:7213/"
}

export default http;