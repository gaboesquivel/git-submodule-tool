import shell from "shelljs";

export function execute(argLine) {
    shell.exec(`git ${argLine}`);
    shell.exec(`git submodule foreach --recursive git ${argLine}`);
}

export default execute;