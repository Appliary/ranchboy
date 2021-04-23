const Prompts = require('prompts');

const DoSSH = require('../doSSH');

module.exports = async function SelectMode(cluster, node, pod) {
  const { mode } = await Prompts({
    type: 'toggle',
    name: 'mode',
    message: 'Select mode:     ',
    initial: true,
    active: '[ Shell ]',
    inactive: '[ Logs ]'
  });

  return DoSSH(cluster, node, pod, mode);
}
