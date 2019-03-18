const minimist = require('minimist');

module.exports = () => {
    const args = minimist(process.argv.slice(2));
    const argLine = process.argv.slice(2).join(" ");

    let cmd = args._[0] || 'help';

    if (args.version || args.v) {
        cmd = 'version'
    }

    if (args.help || args.h) {
        cmd = 'help'
    }

    switch (cmd) {
        case 'branch':
            if (args.d || args.D) {
                require('./cmds/exec')(argLine);
            } else {
                require('./cmds/branch')(args);
            }
            break;

        case 'status':
            require('./cmds/status')(args);
            break;

        case 'commit':
            require('./cmds/commit')(args);
            break;

        case 'log':
            require('./cmds/log')();
            break;

        case 'checkout':
        case 'pull':
        case 'reset':
        case 'push':
        case 'fetch':
        case 'add':
            require('./cmds/exec')(argLine);
            break;

        case 'version':
            require('./cmds/version')(args);
            break;

        case 'help':
            require('./cmds/help')(args);
            break;

        default:
            console.error(`Command '${cmd}' is not supported!`);
            break;
    }
}
