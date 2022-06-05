import http from "./httpClient";


const baseUri = http.host + "api/ConstructionSites";

async function getAll(){
    return await http.get(baseUri);
}

async function createSite(obj){
    return await http.post(baseUri, obj);
}

async function getSingleSite(id){
    return await http.get(baseUri+"/"+id);
}

async function deleteSite(id){
    return await http.delete(baseUri+"/"+id);
}

async function undoDeleteSite(id){
    return await http.patch(baseUri+"/EnableConstructionSite/"+id);
}

async function updateConstructionSite(id, obj){
    return await http.update(baseUri+"/"+id, obj);
}


const constructionSiteClient = {
    getAll,
    getSingleSite,
    createSite,
    deleteSite,
    undoDeleteSite,
    updateConstructionSite
};

export default constructionSiteClient;