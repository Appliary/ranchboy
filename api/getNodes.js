const Axios = require('axios');

const GetConfig = require('../utils/getConfig');
const GetCluster = require('./getCluster');

let cache;

module.exports = async function GetNodes(clusterName) {
  if(!cache) {
    const config = GetConfig();
    const cluster = await GetCluster(clusterName);

    const res = await Axios({
      url: `${config.rancherUrl}clusters/${cluster.id}/nodes?sort=name`,
      auth: config
    });

    cache = res.data.data;
  }

  return cache;
}
