import minimist from 'minimist';

import exec from './cmds/exec';
import branch from './cmds/branch';
import status from './cmds/status';
import commit from './cmds/commit';
import version from './cmds/version';
import help from './cmds/help';

export function main() {
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
                exec(argLine);
            } else {
                branch(args);
            }
            break;

        case 'status':
            status(args);
            break;

        case 'commit':
            commit(args);
            break;

        case 'checkout':
        case 'pull':
        case 'reset':
        case 'push':
        case 'fetch':
        case 'add':
            exec(argLine);
            break;

        case 'version':
            version(args);
            break;

        case 'help':
            help(args);
            break;

        default:
            console.error(`Command '${cmd}' is not supported!`);
            break;
    }
}

export default main;
