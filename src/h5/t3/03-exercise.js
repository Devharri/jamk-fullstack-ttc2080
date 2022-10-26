const fs = require('fs');

fs.readFile('luvut.txt', (error, data) => {
    if (error) console.error(error)
    else 
    var text = data.toString();
    var myArray = text.split(",");
    var summa = 0;
    for (let i = 0; i < myArray.length; i++) {
        summa += parseInt(myArray[i]);
    }
    console.log(summa)
 });
 
 console.log("Program ended");