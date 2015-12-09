var cp = require('child_process');

module.exports = function(cwd) {
  return new Promise(function(resolve, reject) {
    cp.exec('npm install --ignore-scripts', { cwd: cwd }, function(err, stdout, stderr) {
      console.log(stdout);
      console.error(stderr);
      if (err) {
        return reject(err);
      }

      cp.exec('node lifecycleScripts/prepareForBuild.js', { cwd: cwd }, function(err2, stdout2, stderr2) {
        console.log(stdout2);
        console.error(stderr2);
        if (err2) {
          return reject(err2);
        }
        resolve();
      });
    });
  });
}
