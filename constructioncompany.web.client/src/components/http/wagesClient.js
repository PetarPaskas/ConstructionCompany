import http from "./httpClient";

const baseUri = http.host + "api/Wages";

async function submitWages(data){
   return await http.post(baseUri, data);
}

export default {
    submitWages
}