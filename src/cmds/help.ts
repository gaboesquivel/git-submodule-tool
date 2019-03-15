const menus = {
  main: `
    gst [command] <options>

    branch ............. show the branches for all git repos
    status ............. show the status for all git repos
    version ............ show package version
    help ............... show help menu for a command`,

  branch: `
    gst branch`,

  status: `
    gst status`
}
  
export function help(args) {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  console.log(menus[subCmd] || menus.main)
}

export default help;