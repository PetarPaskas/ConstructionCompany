import http from "./httpClient";


const baseUri = http.host + "api/Notes";


async function getAll(){
    return await http.get(baseUri);
}

async function getSingleNote(id){
    return await http.get(baseUri+"/"+id);
}

async function createNote(obj){
    return await http.post(baseUri, obj);
}

async function deleteNote(id){
    return await http.delete(baseUri+"/"+id);
}

async function updateNote(id, obj){
    return await http.patch(baseUri+"/"+id, obj);
}


const noteClient = {
    getAll,
    getSingleNote,
    createNote,
    deleteNote,
    updateNote
};

export default noteClient;