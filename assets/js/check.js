const date = new Date()
let day = date.getDate()
let month = date.getMonth() + 1;
let year = date.getFullYear();

let TimeCheck = function () {
    const currentDate = `(${month}/${day}/${year})`
    return currentDate;
};

let FutureCheck = function (i) {
    const futureDay = day + i + 1
    const futureDate = `(${month}/${futureDay}/${year})`
    return futureDate;
}