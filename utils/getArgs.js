module.exports = function() {
  return process.argv.slice(
    process.argv.findIndex(x => x.endsWith('/index.js') || x.endsWith('/ranchboy')) + 1
  );
}
