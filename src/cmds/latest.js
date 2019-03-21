const shell = require("shelljs");

module.exports = () => {

    const cmd = `git pull --rebase --prune`;
    const submoduleCmd = `git submodule foreach --recursive ${cmd}`;

    console.log(`
      Executing:
      ${submoduleCmd}
      then:
      ${cmd}
    `);
    
    shell.exec(submoduleCmd);
    shell.exec(cmd);
}
