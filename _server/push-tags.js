const cp = require('child_process');
const getConfig = require('../util/get-config');

module.exports = function pushTags() {
  return new Promise((resolve, reject) => {
    cp.exec(`git push ${getConfig('remote')} --tags`, (err, stdout, stderr) => {
        if (err) {
          err.stderr = stderr;
          reject(err);
        }
        else {
          resolve({stdout, stderr});
        }
    });
  });
}
