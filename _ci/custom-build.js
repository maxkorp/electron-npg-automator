var cp = require('child_process');

module.exports = function(electronVersion, moduleParentPath, modulePath) {
  return new Promise(function(resolve, reject) {
    cp.exec(
      `node lifecycleScripts/install.js --electronVersion=${electronVersion}`,
      {cwd: modulePath},
      function(err, stdout, stderr) {
        console.log(stdout);
        console.error(stderr);
        if (err) {
          reject(err);
        }
        else {
          resolve();
        }
      }
    );
  });
};
