const shell = require("shelljs");

module.exports = (argLine) => {
    shell.exec(`git ${argLine}`);
    shell.exec(`git submodule foreach --recursive git ${argLine}`);
}
