const shell = require("shelljs");

module.exports = () => {
    const cmd = `log --graph --date=relative --pretty=tformat:'%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%an %ad)%Creset'`;
    shell.exec(`git ${cmd}`);
}
