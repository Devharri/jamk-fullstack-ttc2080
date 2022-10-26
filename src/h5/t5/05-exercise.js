const kirjasto = require('./kirjasto')
const path = require('path')

if (process.argv.length > 5 || isNaN(process.argv[2]) || isNaN(process.argv[3]) || isNaN(process.argv[4])) {
    console.log(`Usage: ${path.basename(__filename)} RANDOMIZED_NUMBERS_COUNT MIN_VALUE MAX_VALUE`)
    process.exit(-1)
  }

console.log(kirjasto.getRndInteger(parseInt(process.argv[2]),parseInt(process.argv[3]),parseInt(process.argv[4])));