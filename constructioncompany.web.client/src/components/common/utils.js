export function createDashboardOption(id,name,path,popoutPath=""){
    return {
        id,
        displayName: name,
        path,
        popoutPath:`${path}${popoutPath}`,
        isSelected:false
    }
}