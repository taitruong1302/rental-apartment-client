export const objToArr = (obj) => {
    return Object.entries(obj).map(item => ({
        [item[0]]: item[1]
    }))
}