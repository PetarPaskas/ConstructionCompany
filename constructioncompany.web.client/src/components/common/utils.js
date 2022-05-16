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
            {id:1,ime:"Janko",prezime:"Jankovic",radiOd:"juce",trenutno:"Gradiliste 2",profesija:"Maler", satnica:500},
            {id:2,ime:"Janko",prezime:"Jankovic",radiOd:"juce",trenutno:"Gradiliste 2",profesija:"Maler", satnica:500},
            {id:3,ime:"Janko",prezime:"Jankovic",radiOd:"juce",trenutno:"Gradiliste 2",profesija:"Maler", satnica:500},
            {id:4,ime:"Janko",prezime:"Jankovic",radiOd:"juce",trenutno:"Gradiliste 2",profesija:"Maler", satnica:500}
        ]
    });
}