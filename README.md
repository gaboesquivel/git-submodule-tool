# git-submodule-tool (gst)

A tool that simplifies working with projects using git submodules.

## Installation
GST is available via npm.
```
npm install -g git-submodule-tool
```

## Usage
GST supports common git commands and uses the same syntax as git. Each command will run the equivalent git command in the parent directory and in the submodule directories.

```
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
```