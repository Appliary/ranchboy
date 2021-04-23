#!/usr/bin/env node
const FS = require('fs');

const Config = require('./config');
const GetArgs = require('./utils/getArgs');
const GetConfig = require('./utils/getConfig');
const SelectCluster = require('./select/cluster');
const SelectNode = require('./select/node');
const SelectPod = require('./select/pod');
const SelectMode = require('./select/mode');
const DoSSH = require('./doSSH');

const args = GetArgs();

if (args[0] === '--help') {
  console.log('v' + require('./package.json').version);
  console.log(FS.readFileSync(`${__dirname}/readme.ans`).toString('utf8'));
  return;
}

if (
  !FS.existsSync(GetConfig.filename) ||
  args[0] == '--config'
) {
  return Config();
}

switch (args.length) {
  case 0:
    return SelectCluster();

  case 1:
    return SelectNode(args[0]);

  case 2:
    return SelectPod(args[0], args[1]);

  case 3:
    if (args[2].startsWith('-')) return DoSSH(args[0], args[1]);
    return SelectMode(args[0], args[1], args[2]);

  default:
    switch (args[3]) {
      case '--log':
      case '--logs':
      case 'log':
      case 'logs':
      case 'l':
        return DoSSH(args[0], args[1], args[2], false);

      case '--shell':
      case '--ssh':
      case 'shell':
      case 'ssh':
      case 's':
        return DoSSH(args[0], args[1], args[2], true);

      default:
        return SelectMode(args[0], args[1], args[2]);
    }
}

