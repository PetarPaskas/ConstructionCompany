export function createDashboardOption(id,name,path,popoutPath=""){
    return {
        id,
        displayName: name,
        path,
        popoutPath:`${path}${popoutPath}`,
        isSelected:false
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