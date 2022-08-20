import http from "./httpClient";

const baseUri = http.host + "api/Wages";

async function submitWages(data){
   return await http.post(baseUri, data);
}


// data => { date(DateTime), fileType}
// fileType => 1 = XlsFile; 2 = XlsxFile
async function requestFile(data){
    const {date} = data;
    const year = date.getFullYear();
    const month = (date.getMonth()+1);
    const day = date.getDate();
    const queryString =`?date=${year}-${month}-${day}&fileType=${data.fileType}`;

    window.open(
        `${baseUri}/RequestFile${queryString}`,
        "_self"
    );
}

export default {
    submitWages, 
    requestFile
}