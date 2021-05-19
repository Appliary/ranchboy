const Axios = require('axios');

const GetConfig = require('../utils/getConfig');
const GetCluster = require('./getCluster');
const GetNode = require('./getNode');

module.exports = async function GetPods(clusterName, nodeName) {
  const config = GetConfig();
  const cluster = await GetCluster(clusterName);
  const node = await GetNode(clusterName, nodeName);

  const projects = await Axios({
    url: cluster.links.projects,
    auth: config,
  });

  const pods = [];

  await Promise.all(projects.data.data.map(async (project) => {
    const res = await Axios({
      url: project.links.pods,
      auth: config,
    });

    res.data.data.forEach(pod => {
      if (pod.nodeId != node.id) return;
      if (!pod.status.containerStatuses.length) return;
      if (!pod.workloadId || !pod.workloadId.startsWith('deployment:')) return;
      pod.slug = pod.workloadId.slice(11).replace(/:/g, ' - ');
      try {
        pod.container = pod.status.containerStatuses[0].containerID.slice(9);
        pods.push(pod);
      } catch(e) {}
    })
  }));

  return pods;
}
