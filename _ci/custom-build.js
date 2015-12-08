var cp = require('child_process');

module.exports = function(electronVersion, moduleParentPath, modulePath) {
  return new Promise(function(resolve, reject) {
    const electronVersionArg = `--electronVersion=${electronVersion}`;

    cp.spawn('node', ['lifecycleScripts/install.js', electronVersionArg], {cwd: modulePath})
      .on('close', function(code) {
        console.log('woah!');
        console.log(code);
        if (code != 0) {
          return reject(code);
        }
        resolve();
      });
  });
}
