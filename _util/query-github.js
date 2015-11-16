const request = require('request');
const getConfig = require('./get-config');

const urls = {
  electron: 'https://api.github.com/repos/Atom/electron/',
  module: `https://api.github.com/repos/${getConfig('module')}/`
};

module.exports = function get(which, sub) {
  let opts = {
    headers: {
      'Authorization': `token ${getConfig('gh_token')}`,
      'User-Agent': 'electron-npg-automator'
    },
    json: true,
    url: urls[which] + sub
  };

  return new Promise((resolve, reject) => {
    request.get(opts, (err, response, body) => {
      if (err) {
        return reject(err);
      }
      response.body = body;
      if (response.statusCode != 200) {
        return reject(response);
      }

      return resolve(response);
    }).on('error', reject);
  });
};
