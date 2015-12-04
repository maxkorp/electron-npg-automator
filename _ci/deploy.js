const cp = require('child_process');
const fs = require('fs');
const path = require('path');
const modulePath = require('../util/module-path');
const getTagInfo = require('../util/get-tag-info');

getTagInfo()
  .then(({electronVersion}) => {
    var modulePath_ = modulePath();
    var cmd = path.join(modulePath_, 'node_modules', '.bin', 'node-pre-gyp');
    var target = electronVersion.replace('v', '');
    var args = ['package', 'publish', '--runtime=electron', `--target=${target}`];
    var proc = cp.spawn(cmd, args, {cwd: modulePath_});
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on('close', (code) => {
      process.exit(code);
    });
  });
