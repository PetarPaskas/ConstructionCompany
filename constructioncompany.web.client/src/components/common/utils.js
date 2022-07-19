export function shortenText(text,maxLength){
    return text.slice(0,maxLength-3)+"...";
}


export function processFinalDataForAddEditUserForm(finalData, hasUser){
    console.log(finalData);
    if(hasUser){
        let hasConstructionSite = false;

        if(finalData.constructionSite?.constructionSiteId){
            hasConstructionSite = true;
        }

        finalData.professionId = finalData.profession.professionId;
        finalData.currencyId = finalData.currency.currencyId;
        finalData.constructionSitesId = 0;
    
        finalData.professionOptions.find(option => option.id === finalData.profession.professionId).isSelected = true;
        finalData.currencyOptions.find(option => option.id === finalData.currency.currencyId).isSelected = true;

        if(hasConstructionSite){
            let option = finalData.constructionSiteOptions.find(option => option.id === finalData.constructionSite.constructionSiteId);
            option.isSelected = true;
            finalData.constructionSitesId = [option];
        }

    }
}


export function createDashboardOption(id,name,path,popoutPath=""){
    return {
        id,
        displayName: name,
        path,
        popoutPath:`${path}${popoutPath}`,
        isSelected:false
    }
}

export function pageData(data, pagingOptions){
    let endIndex = pagingOptions.currentPage * pagingOptions.itemsPerPage;
    let startIndex = endIndex - pagingOptions.itemsPerPage;
    let arr = [];

    for(let i = 0;i<data.length;i++){
        if(i>=startIndex && i<endIndex){
            arr.push(data[i]);
        }
    }

    return arr;
}


export function formatDateFunction(dateString){
    if(!dateString){
        return null;
    }

    let date = new Date(dateString);
    return `${date.getDate()}-${(date.getMonth()+1) < 10 ? `0${(date.getMonth()+1)}` : (date.getMonth()+1)}-${date.getFullYear()}`;
}
function sortString(a,b,direction, selector = "") {
    a = a ?? "";
    b = b ?? "";

    if(selector.length > 0){
        return direction === 'asc' ? 
        a[selector].localeCompare(b[selector]) : 
        -1*(a[selector].localeCompare(b[selector]))
    }
    return direction === 'asc' ? 
    a.localeCompare(b) : 
    -1*(a.localeCompare(b))
}
export function orderByProperty(data, name, direction){
    let sortingData = data.map(el => ({...el}));
    switch(name.toLowerCase()){
        case "ime":
            return sortingData.sort((a,b)=>sortString(a,b,direction,"name"));
        case "prezime":
            return sortingData.sort((a,b)=>sortString(a,b,direction,"surname"));
        case "profesija":
            return sortingData.sort((a,b)=>sortString(a.profession.professionName,b.profession.professionName,direction));
        case "trenutno":
            return sortingData.sort((a,b)=>sortString(a.constructionSite?.constructionSiteName,b.constructionSite?.constructionSiteName,direction));
        case "radi od":
            return sortingData.sort((a,b)=>{
                const [aYear, aDay] = a.employmentStartDate.split("T");
                const [bYear, bDay] = b.employmentStartDate.split("T") ?? "";

                let first = aYear.split("-").map(el=>parseInt(el)).reduce((a,b)=>a+b);
                let second = bYear.split("-").map(el=>parseInt(el)).reduce((a,b)=>a+b);
                return direction === "asc" ? first - second : second - first;
            })
        case "satnica":
            return data.sort((a,b)=>{
                let first = parseFloat(a.hourlyRate);
                let second = parseFloat(b.hourlyRate);
                return direction === "asc" ? first - second : second - first;
            });
        default:
            return data;
    }
}

export function getSelectedOption(options){
    return options.find(el=>el.isSelected);
}

export function dateToString(date){
    let newDate = new Date(date);
        var mm = newDate.getMonth() + 1; // getMonth() is zero-based
        var dd = newDate.getDate();
      
        return [(dd>9 ? '' : '0') + dd,
                (mm>9 ? '' : '0') + mm,
                newDate.getFullYear(),
               ].join(' / ');
}

export function asDateOnly(date){
    if(date && date.length > 0)
    return date.split("T")[0];

    return "";
}


export function translateEngToSrb(name){
    const translations={
        name:"Ime",
        surname:"Prezime",
        nickname:"Nadimak",
        phoneNumber:"Broj telefona",
        employmentStartDate: "Začetak radnog odnosa",
        employmentEndDate: "Kraj radnog odnosa",
        hourlyRate: "Satnica",
        title: "Naslov",
        description:"Opis",
        dateStarted:"Začetak vremena",
        expectedEndDate:"Očekivani završetak vremena",
        address:"Adresa",
        cityId:"Odabir grada"
    }

    return translations[name];
}
//////////////////////////////////    VALIDATION    //////////////////////////////////////

function isLongerThan(val, length){
    if(val.length > length)
    return true;

    return null;
}

function isShorterThan(val, length){
    if(val.length < length)
    return true;

    return null;
}

function isNullOrEmpty(val){
    if(val === null || val === undefined || val.length === 0){
        return true;
    }

    return null;
}

function commonReqValidate(val, prop){
    if(isNullOrEmpty(val))
    return `${translateEngToSrb(prop)} ne sme biti prazno.`;

    return commonValidate(val,prop);
}

function longReqValidate(val, prop){
    if(isNullOrEmpty(val))
    return `${translateEngToSrb(prop)} ne sme biti prazno.`;

    if(isLongerThan(val,1000))
    return `${translateEngToSrb(prop)} ne sme biti duže od 1000 karaktera.`

    if(isShorterThan(val,5))
    return `${translateEngToSrb(prop)} ne sme biti kraće od 5 karaktera.`
}

function commonValidate(val, prop){
    if(isLongerThan(val,30))
    return `${translateEngToSrb(prop)} ne sme biti duže od 30 karaktera.`

    if(isShorterThan(val,5))
    return `${translateEngToSrb(prop)} ne sme biti kraće od 5 karaktera.`

    return null;
}

function commonUnreqValidate(val, prop){
    if(isNullOrEmpty(val))
    return null;

    return commonValidate(val,prop);
}

function reqNumValidate(val, prop){
    if(isNullOrEmpty(`${val}`) || parseInt(val) === 0)
    return  `${translateEngToSrb(prop)} ne sme biti prazno`;

    return null;
}

export function generateSchemaForAddEditUserForm(){
    return {
        name:(newVal)=>commonReqValidate(newVal,"name"),
        surname:(newVal)=>commonReqValidate(newVal,"surname"),
        nickname:(newVal)=>null,
        phoneNumber:(newVal)=>commonUnreqValidate(newVal,"phoneNumber"),
        employmentStartDate:(newVal)=>commonReqValidate(newVal,"employmentStartDate"),
        employmentEndDate:(newVal)=>commonUnreqValidate(newVal,"employmentEndDate"),
        hourlyRate:(newVal)=>(isNullOrEmpty(newVal) ? `${translateEngToSrb("hourlyRate")} ne sme biti prazna` : null)
    }
}

export function generateSchemaForNoteForm(){
    return {
        title:(newVal)=>longReqValidate(newVal,"title"),
        description:(newVal)=>longReqValidate(newVal,"description")
    }
}

export function generateSchemaConstructionSite(){
    return {
        displayName:(newVal)=>commonReqValidate(newVal,"title"),
        address:(newVal)=>commonReqValidate(newVal,"address"),
        dateStarted:(newVal)=>(isNullOrEmpty(newVal) ? `${translateEngToSrb("dateStarted")} ne sme biti prazno` : null),
        expectedEndDate:(newVal)=>(isNullOrEmpty(newVal) ? `${translateEngToSrb("expectedEndDate")} ne sme biti prazno` : null),
        cityId:(newVal)=>reqNumValidate(newVal,"cityId"),
    }
}

//////////////////////////////////    VALIDATION    //////////////////////////////////////

export function getFullCurrentMonth(){
    const today = new Date();
    const datum = new Date(today.getFullYear(),today.getMonth()+1,0);
    return datum;
}
const datumBase = [ "Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sept", "Okt", "Nov", "Dec"]

const datumSrb = {
    "Jan":"Januar",
    "Feb":"Februar",
    "Mar":"Mart",
    "Apr":"April",
    "Maj":"Maj",
    "Jun":"Jun",
    "Jul":"Jul",
    "Avg":"Avgust",
    "Sept":"Septembar",
    "Okt":"Oktobar",
    "Nov":"Novembar",
    "Dec":"Decembar"
}


export function getDateMonthSrb(date, withYear = false){
    const month = datumSrb[datumBase[date.getMonth()]];
    return withYear ? `${month} ${date.getFullYear()}` : month;
}

export function createHeadersDataForUsersTable(){
    return[{id:1,name:"Ime"},{id:2,name:"Prezime"},{id:3,name:"Profesija"},{id:4,name:"Radi Od"},{id:5,name:"Satnica"},{id:6,name:"Trenutno"}];
}

function wrapInHourly(num){
    return `${num}din/hr`;
}

export function headersForConstructionSiteUsersEditTableCustomBody(){
 return [{id:1, name:"Ime"},{id:2, name:"Prezime"},{id:3, name:"Profesija"},{id:5, name:"Satnica"}];
}

export function getDisplayFieldForItem(displayField){
    if(Array.isArray(displayField)){
        let finalName = "";
        for(let element of displayField){
            finalName = `${finalName} ${this[element]}`;
        }
        return finalName;
    }

    return this[displayField];
}

// export function createFakeDataForTableConstructionSite(){
//     return ({
//         header:[{id:1,name:"Ime"},{id:2,name:"Prezime"},{id:3,name:"Profesija"},{id:5,name:"Satnica"}],
//         body:[
//             {id:1,ime:"AJanko",prezime:"Jankovic",profesija:"Maler", satnica:wrapInHourly(500)},
//             {id:2,ime:"BJanko",prezime:"Jankovic",profesija:"Maler", satnica:wrapInHourly(600)},
//             {id:3,ime:"Janko",prezime:"Jankovic",profesija:"Maler", satnica:wrapInHourly(700)},
//             {id:4,ime:"CJanko",prezime:"Jankovic",profesija:"Maler", satnica:wrapInHourly(800)},
//             {id:5,ime:"CJanko",prezime:"Jankovic",profesija:"Maler", satnica:wrapInHourly(900)},
//             {id:6,ime:"CJanko",prezime:"Jankovic",profesija:"Maler", satnica:wrapInHourly(1000)}
//         ]
//     });
// }

// export function createFakeDataForConstructionSite(){
//     return ([
//         {
//             ConstructionSiteId:1,
//             Name:"Gradiliste 1",
//             Address:"Milosa Perica 7",
//             CityName: "Beograd",
//             Client:{
//                 Id:12,
//                 Name:"Plavi Snovi D.O.O"
//             }
//         },
//         {
//             ConstructionSiteId:2,
//             Name:"Gradiliste 2",
//             Address:"Milosa Perica 7",
//             CityName: "Beograd",
//             Client:{
//                 Id:12,
//                 Name:"Plavi Snovi D.O.O"
//             }
//         },
//         {
//             ConstructionSiteId:3,
//             Name:"Gradiliste 3",
//             Address:"Urosa Jovanovica 27",
//             CityName: "Slankamen",
//             Client:{
//                 Id:13,
//                 Name:"Mokri Snovi D.O.O"
//             }
//         },
//         {
//             ConstructionSiteId:4,
//             Name:"Gradiliste 4",
//             Address:"Milosa Perica 7",
//             CityName: "Beograd",
//             Client:{
//                 Id:12,
//                 Name:"Plavi Snovi D.O.O"
//             }
//         },
//         {
//             ConstructionSiteId:5,
//             Name:"Gradiliste 5",
//             Address:"Milosa Perica 27",
//             CityName: "Zrenjanin",
//             Client:{
//                 Id:12,
//                 Name:"Plavi Snovi D.O.O"
//             }
//         }
//     ]);
// }


// export function createFakeDataForNotes(){
//     return [{
//         noteId:1,
//         dateCreated:"2020-08-08",
//         description:"Njansjfnajksnf",
//         title:"Naslov",
//         user:{userId:1,name:"John"},
//         constructionSite:{constructionSiteId:1, name:"Gradiliste 22"}
//     },
//     {
//         noteId:2,
//         dateCreated:"2020-08-08",
//         description:"Lalalala",
//         title:"Naslov",
//         user:{userId:1,name:"Mike"},
//         constructionSite:{constructionSiteId:2, name:"Gradiliste 222"}
//     },
//     {
//         noteId:3,
//         dateCreated:"2020-08-08",
//         description:"Lalalala",
//         title:"Naslov",
//         user:{userId:1,name:"Mike"},
//         constructionSite:{constructionSiteId:1, name:"Gradiliste 12"}
//     },
//     {
//         noteId:4,
//         dateCreated:"2020-08-08",
//         description:"Lalalala",
//         title:"Naslov",
//         user:{userId:1,name:"John"},
//         constructionSite:{constructionSiteId:1, name:"Gradiliste 12"}
//     },
//     {
//         noteId:5,
//         dateCreated:"2020-08-08",
//         description:"Lalalala",
//         title:"Naslov",
//         user:{userId:1,name:"John"},
//         constructionSite:{constructionSiteId:1, name:"Gradiliste 22"}
//     }]
// }
