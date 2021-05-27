module.exports = function() {
  if (process.argv.includes('--args')) {
    console.log(JSON.stringify(process.argv));
    return process.exit(0);
  }
  return process.argv.slice(
    process.argv.findIndex(x => x.endsWith('/index.js') || x.endsWith('/ranchboy') || x.endsWith('/node.exe')) + 1
  );
}
