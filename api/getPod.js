const GetPods = require('./getPods');
const Fuzzy = require('../utils/fuzzy');
const nameError = require('../utils/nameError');

module.exports = async function getPod(clusterName, nodeName, name) {
  const pods = await GetPods(clusterName, nodeName);

  const pod = pods.find(pod => pod.workloadId.match(Fuzzy(name)));
  if(!pod) return name;

  pod.container = pod.status.containerStatuses[0].containerID.slice(9);
  return pod;
}
