const cp = require('child_process');
const getTagInfo = require('../util/get-tag-info');
const moduleParentPath = require('../util/module-parent-path');
const path = require('path');

getTagInfo()
  .then(({electronVersion}) => {
    var cmd = 'node';
    var args = [
      path.resolve('node_modules', '.bin', 'electron-rebuild'),
      '-v', electronVersion.replace('v', ''),
      '-m', moduleParentPath()
    ];

    var proc = cp.spawn(cmd, args);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on('close', (code) => {
      process.exit(code);
    });
  });
