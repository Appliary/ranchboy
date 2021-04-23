const GetNodes = require('./getNodes');
const Fuzzy = require('../utils/fuzzy');
const nameError = require('../utils/nameError');

const cache = {};

module.exports = async function getNode(clusterName, name) {
  if (!cache[clusterName]) cache[clusterName] = {};
  if (!cache[clusterName][name]) {
    const nodes = await GetNodes(clusterName);

    cache[clusterName][name] = nodes.find(node => {
      if (node.id == name) return true;
      if (node.hostname.match(Fuzzy(name))) return true;
    });
  }

  return cache[clusterName][name] || nameError('Node', name);
}
