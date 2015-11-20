const checkVersions = require('./check-versions');
const getConfig = require('../util/get-config');
const makeTag = require('./make-tag');
const pushTags = require('./push-tags');

const pollInterval = getConfig('poll_interval');
function runTagger() {
  return pushTags()
    .then(checkVersions)
    .then(({moduleReleases, electronReleases}) => {
      var prom = Promise.resolve();
      moduleReleases.forEach((moduleRelease) => {
        electronReleases.forEach((electronRelease) => {
          prom = prom.then(() => {
            return makeTag(moduleRelease, electronRelease);
          });
        });
      });
      return prom;
    })
    .catch((reason) => {
      console.error(`${new Date().toString()}: ${reason}`);
    });;
}

console.log(`${new Date().toString()}: Server started`);
setInterval(runTagger, pollInterval);
console.log(`${new Date().toString()}: Polling every ${pollInterval}ms`);
runTagger();
