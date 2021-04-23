const CP = require('child_process');

const buff = [];

module.exports = async function LogViewer(cmd) {
  const child = CP.exec(cmd);

  child.stdout.on('data', (chunck) => buff.push(chunck));


}
