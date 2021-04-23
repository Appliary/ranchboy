const Axios = require('axios');

module.exports = async function CheckPassword(value, rancherUrl, username){
  if (!value) return 'This field is mandatory.';

  try {
    await Axios({
      url: rancherUrl,
      auth: {
        username,
        password: value,
      }
    });
  } catch (err) {
    console.error(err);
    return `Authentication failed.`;
  }

  return true;
}
