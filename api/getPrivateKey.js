const OS = require('os');
const Axios = require('axios');
const Zip = require('adm-zip');
const execSh = require('exec-sh').promise;

const GetConfig = require('../utils/getConfig');
const GetNode = require('./getNode');

const DIR = OS.tmpdir();

module.exports = async function GetPrivateKey(clusterName, nodeName) {
  const config = GetConfig();
  const node = await GetNode(clusterName, nodeName);

  const res = await Axios({
    url: node.links.nodeConfig,
    auth: config,
    responseType: 'arraybuffer',
  });

  const zip = new Zip(res.data);

  const file = `${node.hostname}/id_rsa`;
  await execSh(`rm -rf ${DIR}/${file}`);

  zip.extractEntryTo(file, DIR);

  return `${DIR}/${file}`;
}
