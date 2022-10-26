const fs = require('fs');

function increaseNumber() {
    var requestNumber = 0;

    //read syncro
    try {
        const data = fs.readFileSync('luku.txt', 'utf8');
        console.log(data);
        requestNumber = parseInt(data);
        console.log(requestNumber);

    } catch (err) {
        console.error(err);
    }

    //increase number by 1
    requestNumber++;
    console.log(requestNumber);

    const content = requestNumber.toString();
    console.log(content);

    //write syncro
    try {
        fs.writeFileSync('luku.txt', content);
        // file written successfully
    } catch (err) {
        console.error(err);
    }

    return "Request counter value is :" + requestNumber.toString();
}

module.exports = {
    increaseNumber
}