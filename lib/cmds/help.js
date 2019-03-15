"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var menus = {
    main: "\n    gst [command] <options>\n\n    branch ............. show the branches for all git repos\n    status ............. show the status for all git repos\n    version ............ show package version\n    help ............... show help menu for a command",
    branch: "\n    gst branch",
    status: "\n    gst status"
};
function help(args) {
    var subCmd = args._[0] === 'help'
        ? args._[1]
        : args._[0];
    console.log(menus[subCmd] || menus.main);
}
exports.help = help;
exports.default = help;
