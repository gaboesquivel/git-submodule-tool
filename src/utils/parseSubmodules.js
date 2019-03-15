const splitSpaces = require("./splitSpaces");

/**
 * Takes a string of output from a git command run with 'git submodule foreach --recursive'
 * and parses that string for each submodule by splitting on the 'Entering' keyword.
 * 
 * Returns an array of objects where each object has the submodule path and the rest of the git output.
 * 
 * Example -
 * Given:
 * ```
 * Entering 'projects/project-1'
 * On branch some-branch
 * Your branch is up to date with 'origin/some-branch'.
 * 
 * nothing to commit, working tree clean
 * Entering 'projects/project-2'
 * On branch some-branch
 * Your branch is up to date with 'origin/some-branch'.
 * 
 * nothing to commit, working tree clean
 * ```
 * 
 * This function will return:
 * ```
 * [
 *   {
 *     "repo": "projects/project-1",
 *     "output": "On branch some-branch\n Your branch is up to date with 'origin/some-branch'.\n \n nothing to commit, working tree clean\n"
 *   },
 *   {
 *     "repo": "projects/project-2",
 *     "output": "On branch some-branch\n Your branch is up to date with 'origin/some-branch'.\n \n nothing to commit, working tree clean\n"
 *   }
 * ]
 * ```
 */
module.exports = (output) => {
    const repoStrings = output.trim().split(/Entering/);
    const repoOutput = [];
    for (let i = 0; i < repoStrings.length; i++) {
        const repo = repoStrings[i];
        if (repo !== '') {
            const repoRows = splitSpaces(repo);
            repoOutput.push({
                repo: repoRows[0].replace(/'/g, ""),
                output: repoRows.slice(1).join(" ")
            });
        }
    }
    return repoOutput;
}