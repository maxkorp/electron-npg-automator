const cp = require('child_process');
const fs = require('fs');
const modulePath = require('../util/module-path');
const getTagInfo = require('../util/get-tag-info');

getTagInfo()
  .then(({electronVersion}) => {
    var folder = fs.readdirSync(modulePath)[0];

    var cmd = 'node-pre-gyp';
    var args = ['publish', '--runtime=electron', `--target=${electronVersion}`];

    var proc = cp.spawn(cmd, args, {cwd: folder});
    proc.on('close', (code) => {
      process.exit(code);
    });
  });
