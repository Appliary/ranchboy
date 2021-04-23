const Axios = require('axios');

const GetConfig = require('../utils/getConfig');
const AuthError = require('../utils/authError');

let cache;

module.exports = async function GetClusters() {
  if (!cache) {
    const config = GetConfig();

    let res;
    try {
      res = await Axios({
        url: `${config.rancherUrl}clusters?sort=name`,
        auth: config
      });
    } catch (e) {
      return AuthError();
    }

    cache = res.data.data;
  }

  return cache;
}
