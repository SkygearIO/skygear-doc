var execSync = require('child_process').execSync;
var version = execSync('cd content && git describe --always --tags && cd ..') + "";
version = version.trim();

console.log(version);

module.exports = version;
