export const getValuesFromObj = (obj)=>{
    return Object.keys(obj).map(k=>{
        return obj[k];
    });
}