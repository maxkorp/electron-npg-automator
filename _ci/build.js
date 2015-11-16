const cp = require('child_process');
const modulePath = require('../util/module-path');
const getTagInfo = require('../util/get-tag-info');

getTagInfo()
  .then(({electronVersion}) => {
    var cmd = path.resolve('node_modules', '.bin', 'electron-rebuild') + (process.platform == 'win32' ? '.cmd' : '');
    var args = [
      '-n', electronVersion,
      '-m', modulePath
    ];

    var proc = cp.spawn(cmd, args);
    proc.on('close', (code) => {
      process.exit(code);
    });
  });
