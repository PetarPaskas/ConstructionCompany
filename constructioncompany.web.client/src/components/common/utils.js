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

export function orderByProperty(data, name, direction){
    let sortingData = data.map(el => ({...el}));
    switch(name.toLowerCase()){
        case "ime":
        case "prezime":
        case "profesija":
        case "trenutno":
            return sortingData.sort((a,b)=> {
                    return direction === 'asc' ? 
                    a[name.toLowerCase()].localeCompare(b[name.toLowerCase()]) : 
                    -1*(a[name.toLowerCase()].localeCompare(b[name.toLowerCase()]))
                }
                );

        case "radi od":
            return sortingData.sort((a,b)=>{
                const [aYear, aDay] = a.radiOd.split("T");
                const [bYear, bDay] = b.radiOd.split("T");

                let first = aYear.split("-").map(el=>parseInt(el)).reduce((a,b)=>a+b);
                let second = bYear.split("-").map(el=>parseInt(el)).reduce((a,b)=>a+b);
                return direction === "asc" ? first - second : second - first;
            })
        case "satnica":
            return data.sort((a,b)=>{
                let first = parseFloat(a.satnica);
                let second = parseFloat(b.satnica);
                return direction === "asc" ? first - second : second - first;
            });
        default:
            return data;
    }
}


export function createFakeDataForTable(){
    return ({
        header:[{id:1,name:"Ime"},{id:2,name:"Prezime"},{id:3,name:"Profesija"},{id:4,name:"Radi Od"},{id:5,name:"Satnica"},{id:6,name:"Trenutno"}],
        body:[
            {id:1,ime:"AJanko",prezime:"Jankovic",radiOd:"2012-02-22T00:00:00",trenutno:"Gradiliste 2",profesija:"Maler", satnica:500},
            {id:2,ime:"BJanko",prezime:"Jankovic",radiOd:"2012-03-22T00:00:00",trenutno:"Gradiliste 2",profesija:"Maler", satnica:600},
            {id:3,ime:"Janko",prezime:"Jankovic",radiOd:"2012-04-22T00:00:00",trenutno:"Gradiliste 2",profesija:"Maler", satnica:700},
            {id:4,ime:"CJanko",prezime:"Jankovic",radiOd:"2012-05-22T00:00:00",trenutno:"Gradiliste 2",profesija:"Maler", satnica:800},
            {id:5,ime:"CJanko",prezime:"Jankovic",radiOd:"2012-05-22T00:00:00",trenutno:"Gradiliste 2",profesija:"Maler", satnica:900},
            {id:6,ime:"CJanko",prezime:"Jankovic",radiOd:"2012-05-22T00:00:00",trenutno:"Gradiliste 2",profesija:"Maler", satnica:1000}
        ]
    });
}

export function createFakeDataForConstructionSite(){
    return ([
        {
            ConstructionSiteId:1,
            Name:"Gradiliste 1",
            Address:"Milosa Perica 7",
            CityName: "Beograd",
            Client:{
                Id:12,
                Name:"Plavi Snovi D.O.O"
            }
        },
        {
            ConstructionSiteId:2,
            Name:"Gradiliste 2",
            Address:"Milosa Perica 7",
            CityName: "Beograd",
            Client:{
                Id:12,
                Name:"Plavi Snovi D.O.O"
            }
        },
        {
            ConstructionSiteId:3,
            Name:"Gradiliste 3",
            Address:"Urosa Jovanovica 27",
            CityName: "Slankamen",
            Client:{
                Id:13,
                Name:"Mokri Snovi D.O.O"
            }
        },
        {
            ConstructionSiteId:4,
            Name:"Gradiliste 4",
            Address:"Milosa Perica 7",
            CityName: "Beograd",
            Client:{
                Id:12,
                Name:"Plavi Snovi D.O.O"
            }
        },
        {
            ConstructionSiteId:5,
            Name:"Gradiliste 5",
            Address:"Milosa Perica 27",
            CityName: "Zrenjanin",
            Client:{
                Id:12,
                Name:"Plavi Snovi D.O.O"
            }
        }
    ]);
}
