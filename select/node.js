const Prompts = require('prompts');

const Fuzzy = require('../utils/fuzzy');
const GetNodes = require('../api/getNodes');
const SelectPod = require('./pod');

module.exports = async function SelectCluster(cluster) {
  const nodes = await GetNodes(cluster);

  const { node } = await Prompts({
    type: 'autocomplete',
    name: 'node',
    message: 'Node:',
    choices: nodes.map(x => ({title: x.hostname, value: x.id})),
    suggest: Fuzzy.suggest,
  });

  if (!node) return process.exit(127);
  return SelectPod(cluster, node);
}
