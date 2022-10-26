
function getRndInteger(count, min, max) {
    var list = [];
    for (let i = 0; i <= count; i++) {
        list.push(Math.floor(Math.random() * (max - min + 1) ) + min);
    }
    list.sort();
    return list;
  }

module.exports = {
    getRndInteger
}