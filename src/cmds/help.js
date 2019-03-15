const menus = {
  main: `
    gst [command] <options>

    Executes the commands 'git submodule foreach --recursive git {command} [options]' and 'git {command} [options] for the given command.
    Some commands have special formatting for the output.

    Commands:
    ---------------------------------------------
    git:
      branch ............. show the branches for all git repos
      status ............. show the status for all git repos
      commit ............. adds and commits all changes in submodules then adds and commits changes in the parent
      checkout ........... same as git checkout - executes on submodules then parent
      pull ............... same as git pull - executes on submodules then parent
      reset .............. same as git reset - executes on submodules then parent
      push ............... same as git push - executes on submodules then parent
      fetch .............. same as git fetch - executes on submodules then parent
      add ................ same as git add - executes on submodules then parent

      *for all commands that are same as git, all command line options are passed through to the git commands

    Other:
      version ............ show package version
      help ............... show help menu
      help [command] ..... show help menu for a command
      [command] -h ....... show help menu for a command
    `,

  branch: `
    gst branch [-d] [-D]
    
    Displays the branch selections by the parent and each submodule.

    Accepts the -d or -D flags to delete branches. Deletion will occur in the parent and all submodules.
    `,

  status: `
    gst status
    
    Prints the status for the parent repo and each submodule.
    `,

  commit: `
    gst commit -m "{your message}"
    
    Does 'git add .' and 'git commit' for each submodule and then the parent.

    The '-m' flag must be specified. The commit message will be applied to each repository. To apply different commit messages to each repo, please use git.
    `,

  checkout: `
    gst checkout [options]

    Same as git. Executed in submodules then the parent. All options passed through to git command.
    `,
  pull: `
    gst pull [options]

    Same as git. Executed in submodules then the parent. All options passed through to git command.
    `,
  reset: `
    gst reset [options]

    Same as git. Executed in submodules then the parent. All options passed through to git command.
    `,
  push: `
    gst push [options]

    Same as git. Executed in submodules then the parent. All options passed through to git command.
    `,
  fetch: `
    gst fetch [options]

    Same as git. Executed in submodules then the parent. All options passed through to git command.
    `,
  add: `
    gst add [options]

    Same as git. Executed in submodules then the parent. All options passed through to git command.
    `,
  version: `
    gst version | gst -v

    Prints the version
    `
}
  
module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0];

  console.log(menus[subCmd] || menus.main);
}
