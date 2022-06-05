import http from "./httpClient";


const baseUri = http.host + "api/Misc";

///Returns an object with
/// {
///     citiesOptions:[{id, name, value, isSelected}]
///     constructionSiteOptions:[]
/// }
async function getAllOptions(){
    return await http.get(baseUri + "/GetAllOptions");
}

async function getProfessionsStripped(){
    return await http.get(baseUri + "/Professions");
}

async function getCitiesStripped(){
    return await http.get(baseUri + "/Cities");
}


const miscClient = {
    getAllOptions,
    getProfessionsStripped,
    getCitiesStripped
};

export default miscClient;