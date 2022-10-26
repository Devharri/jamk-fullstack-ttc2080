//user.js

const d = new Date("1993-01-06");

function getName() {
    return "Harri Honkanen"
}

function getLocation() {
    return " lives in Jyvaskyla"
}

function getBirthday() {
    return " and was born on " + d.getDate() + "." + parseInt(d.getMonth() + 1) + "." + d.getFullYear()
}

module.exports = {
    getName, getLocation, getBirthday
}