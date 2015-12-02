const cp = require('child_process');
const fs = require('fs');
const modulePath = require('../util/module-path');
const getTagInfo = require('../util/get-tag-info');

getTagInfo()
  .then(({electronVersion}) => {
    var cmd = 'node-pre-gyp';
    var args = ['package', 'publish', '--runtime=electron', `--target=${electronVersion}`];
    var proc = cp.spawn(cmd, args, {cwd: modulePath()});
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on('close', (code) => {
      process.exit(code);
    });
  });
