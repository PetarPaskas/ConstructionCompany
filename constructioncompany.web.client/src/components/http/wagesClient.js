import http from "./httpClient";

const baseUri = http.host + "api/Wages";

async function submitWages(data){
   return await http.post(baseUri, data);
}


// data => { date(DateTime), fileType}
// fileType => 1 = XlsFile; 2 = XlsxFile
async function requestFile(data){
    //for now => xlsx files only
    data.fileType = 2;
    return await http.post(`${baseUri}/RequestFile`, data);
}

export default {
    submitWages, 
    requestFile
}