const FS = require('fs');
const OS = require('os');
const MkDir = require('mkdirp');
const Prompts = require('prompts');

const FormatRancherUrl = require('./utils/formatRancherUrl');
const CheckRancherUrl = require('./utils/checkRancherUrl');
const CheckUsername = require('./utils/checkUsername');
const CheckPassword = require('./utils/checkPassword');
const GetConfig = require('./utils/getConfig');

module.exports = async function Config() {
  const config = GetConfig();

  const { rancherUrl } = await Prompts({
    type: 'text',
    name: 'rancherUrl',
    message: 'Rancher URL:',
    initial: config.rancherUrl,
    format: FormatRancherUrl,
    validate: CheckRancherUrl,
  });

  console.log(`\n- Generate your API key in ${rancherUrl.slice(0, -4)}/apikeys`);

  const { username } = await Prompts({
    type: 'text',
    name: 'username',
    message: 'Access Key:',
    initial: config.username,
    validate: CheckUsername,
  });

  const { password } = await Prompts({
    type: 'password',
    name: 'password',
    message: 'Secret Key:',
    validate: (value) => CheckPassword(value, rancherUrl, username),
  });

  if (rancherUrl && username && password) {

    MkDir.sync(GetConfig.directory);

    FS.writeFileSync(GetConfig.filename, JSON.stringify({
      rancherUrl,
      username,
      password,
    }));

    console.log('[32mYou can now use ranchboy ![0m\nChange your credentials anytime by running `rancherboy --config`.');
    process.exit(0);
  } else {
    console.error('[31mConfiguration failed.[0m');
    process.exit(1);
  }
}

