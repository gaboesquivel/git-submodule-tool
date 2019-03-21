const shell = require("shelljs");

module.exports = (args) => {
    if (args._.length === 2) {

      let cmd = `git merge ${args._[1]}`;
      if (args.rebase === true) {
        cmd = `git rebase ${args._[1]}`;
      }

      const submoduleCmd = `git submodule foreach --recursive ${cmd}`;

      console.log(`
        Executing:
        ${cmd}
        then:
        ${submoduleCmd}
      `);
      
      shell.exec(cmd);
      shell.exec(submoduleCmd);

    } else if (args._.length === 3) {

      let cmd = `git pull ${args._[1]} ${args._[2]}`;
      if (args.rebase === true) {
        cmd += ` --rebase`;
      }
      const submoduleCmd = `git submodule foreach --recursive ${cmd}`;

      console.log(`
        Executing:
        ${cmd}
        then:
        ${submoduleCmd}
      `);
      
      shell.exec(cmd);
      shell.exec(submoduleCmd);

    } else {
      console.error(`
        Unexpected number of arguments to 'update-from'.

        Do either 'git update-from origin [branch-name]' to pull in changes from a remote branch

        Or

        'git update-from [branch-name]' to merge in changes from a local branch
      `);
    }

}
