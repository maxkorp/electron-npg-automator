const fstream = require('fstream');
const request = require('request');
const tar = require('tar');
const zlib = require('zlib');
const getUrl = require('./get-module-download-url');
const modulePath = require('./module-path');

module.exports = function downloadModule() {
  return getUrl()
    .then(download);
};

function download(url) {
  return new Promise((resolve, reject) => {
    request.get(url)
      .pipe(zlib.Gunzip())
      .pipe(tar.Extract({path: modulePath}))
      .on('error', reject)
      .on('close', resolve);
  });
}
