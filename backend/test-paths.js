const path = require('path');

console.log('Seeders path:', path.resolve('db', 'seeders'));
console.log('Does .sequelizerc exist?', require('fs').existsSync('.sequelizerc'));
