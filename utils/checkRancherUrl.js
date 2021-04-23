const Axios = require('axios');

const FormatRancherUrl = require('./formatRancherUrl');

module.exports = async function CheckRancherUrl(value){
  if (!value) return 'This field is mandatory.';

  value = FormatRancherUrl(value);

  try {
    await Axios(value);
  } catch (err) {
    if (err.code === 'ENOTFOUND') return 'This domain does not exist.';
    if (err.response && err.response.status == 404) return 'No rancher found on this domain.';
    if (err.response && err.response.status == 401) return true;
    return `Unable to connect to this domain.`;
  }

  return 'No rancher found on this domain.';
}
