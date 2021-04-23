const OS = require('os');

const CONFIG_DIRECTORY = `${OS.homedir}/.rancher`;
const CONFIG_FILENAME = `${CONFIG_DIRECTORY}/ranchboy.json`;

module.exports = function(){
  let config = {};

  try {
    config = require(CONFIG_FILENAME);
  } catch (e) {}

  return config;
}

module.exports.directory = CONFIG_DIRECTORY;
module.exports.filename = CONFIG_FILENAME;
