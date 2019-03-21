const shell = require("shelljs");

module.exports = () => {
    const cmd = `git reset --soft HEAD~1`;
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
