const Prompts = require('prompts');

const Fuzzy = require('../utils/fuzzy');
const GetPods = require('../api/getPods');
const SelectMode = require('./mode');
const DoSSH = require('../doSSH');

module.exports = async function SelectPod(cluster, node) {
  const pods = await GetPods(cluster, node);

  const choices = [
    {
      title: "[ CONNECT TO THE NODE ]",
      value: '-',
    },
    ...pods.map(x => ({title: x.slug, value: x.workloadId}))
  ]

  const a = await Prompts({
    type: 'autocomplete',
    name: 'pod',
    message: 'Pod:',
    choices,
    suggest: Fuzzy.suggest,
  });

  console.log(a);

  if(!pod) return process.exit(127);

  if(pod === '-')
    return DoSSH(cluster, node);

  return SelectMode(cluster, node, pod);
}
