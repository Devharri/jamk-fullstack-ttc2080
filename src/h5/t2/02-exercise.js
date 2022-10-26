const user = require('./user')

var name = user.getName();
var location = user.getLocation();
var bday = user.getBirthday();

console.log(name + location + bday)