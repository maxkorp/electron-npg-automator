var cp = require('child_process');

module.exports = function(cwd) {
  return new Promise(function(resolve, reject) {
    cp.spawn('npm', ['install', '--ignore-scripts'], {cwd: cwd})
      .on('close', function(code) {
        if (code != 0) {
          return reject(code);
        }
        cp.spawn('node', ['lifecycleScripts/prepareForBuild.js'], {cwd: cwd})
          .on('close', function(code) {
            console.log('woah!');
            console.log(code);
            if (code != 0) {
              return reject(code);
            }
            resolve();
          });
      });
  });
}
