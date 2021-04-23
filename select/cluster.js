const Prompts = require('prompts');

const Fuzzy = require('../utils/fuzzy');
const GetClusters = require('../api/getClusters');
const SelectNode = require('./node');

module.exports = async function SelectCluster() {
  const clusters = await GetClusters();

  const { cluster } = await Prompts({
    type: 'autocomplete',
    name: 'cluster',
    message: 'Cluster:',
    choices: clusters.map(x => ({title: x.name, value: x.id})),
    suggest: Fuzzy.suggest,
  });

  if (!cluster) return process.exit(127);
  return SelectNode(cluster);
}
