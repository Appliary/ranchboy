const GetClusters = require('./getClusters');
const Fuzzy = require('../utils/fuzzy');
const nameError = require('../utils/nameError');

const cache = {};

module.exports = async function getCluster(name) {
  if (!cache[name]) {
    const clusters = await GetClusters();

    cache[name] = clusters.find(cluster => {
      if (cluster.id == name) return true;
      if (cluster.name.match(Fuzzy(name))) return true;
    });
  }

  return cache[name] || nameError('Cluster', name);
}
