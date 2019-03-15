const shell = require("shelljs");

module.exports = (args) => {
    console.log('called gst ', args);

    let cmd = 'commit';

    if (args.m) {
        cmd = `commit -m "${args.m}"`;
    }

    `'npm install || :'`
    shell.exec(`git submodule foreach --recursive 'git add . || :'`);
    shell.exec(`git submodule foreach --recursive 'git ${cmd} || :'`);
    shell.exec(`git add .`)
    shell.exec(`git ${cmd}`);
}
