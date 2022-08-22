import http from "./httpClient"

const baseUri = http.host + "api/Clients";

async function submitNewClient(data){
    // {
    //     clientName,
    //     clientAddress,
    //     returnAsOption
    // }
    return http.post(baseUri,data);
}

export default {
    submitNewClient
}