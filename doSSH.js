const execSh = require('exec-sh').promise;

const GetPrivateKey = require('./api/getPrivateKey');
const GetCluster= require('./api/getCluster');
const GetNode = require('./api/getNode');
const GetPod = require('./api/getPod');

module.exports = async function DoSSH(clusterName, nodeName, podName, shell) {
  const cluster = await GetCluster(clusterName);
  const node = await GetNode(clusterName, nodeName);

  const privateKey = await GetPrivateKey(clusterName, nodeName);

  let cmd = `ssh -ti "${privateKey}" ${node.sshUser}@${node.externalIpAddress} `;

  if (podName && podName !== '-') {
    const pod = await GetPod(clusterName, nodeName, podName);
    const container = pod.container || podName;
    const name = pod.workloadId ? pod.workloadId.slice(11).replace(/:/g, ' ‣ ') : podName.slice(5);

    if (shell) {
      console.log(`\n[34m[${cluster.name} ‣ ${node.hostname}]\n  ↳ [${name}]\n\n[90m(CTRL-D TO QUIT)[0m`);
      cmd += `docker exec -ti  ${container} bash`;
    } else {
      cmd += `"docker logs -tf ${container}"`;
    }
  } else {
    console.log(`\n[34m[${cluster.name} ‣ ${node.hostname}]\n\n[90m(CTRL-D TO QUIT)[0m`);
  }

  try {
    await execSh(cmd);
  } catch (e) {}

  // Clearing key
  execSh(`rm -f "${privateKey}"`);
}
