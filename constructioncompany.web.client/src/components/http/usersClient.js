import http from "./httpClient";


const baseUri = http.host + "api/Users";


async function getAll(){
    return await http.get(baseUri);
}

async function createUser(newUser){
    return await http.post(baseUri, newUser);
}

async function getSingleUser(userId){
    return await http.get(baseUri + "/" + userId);
}

async function getAllUsersForDate(date){
    return await http.get(baseUri + "/GetAllUsersForDate/" + date);
}

async function getUsersForConstructionSite(csId){
    return await http.get(baseUri + "/GetUsersForConstructionSite/" + csId);
}

async function getAllUsersForDateOnConstructionSite(date, csId){
    return await http.get(baseUri + `/GetAllUsersForDateOnConstructionSite/${date}/${csId}`);
}

async function disableUser(userId){
    return await http.delete(baseUri + "/" + userId);
}

async function enableUser(userId){
    return await http.update(baseUri + "/EnableUser/" + userId);
}

async function updateUser(userId, newUser){
    return await http.update(baseUri + "/" + userId, newUser);
}


const userClient = {
    getAll,
    createUser,
    getSingleUser,
    getAllUsersForDate,
    getUsersForConstructionSite,
    getAllUsersForDateOnConstructionSite,
    disableUser,
    enableUser,
    updateUser,
};

export default userClient;