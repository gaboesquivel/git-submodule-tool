module.exports = (text) => {
    return text.trim().split(/\\n*\s+|\s+/);
}