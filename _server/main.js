const checkVersions = require('./check-versions');
const getConfig = require('../util/get-config');
const makeTags = require('./make-tags');
const pushTags = require('./push-tags');

const pollInterval = getConfig('poll_interval');
function runTagger() {
  checkVersions()
    .then(makeTags)
    .then((tags) => {
      if (!tags.length) {
        return;
      }

      return pushTags()
        .then(() => {
          console.log(`${new Date().toString()}: pushed ${tags.length} new tag(s)`);
        })
    })
    .catch((reason) => {
      console.error(`${new Date().toString()}: ${reason}`);
    });;
}

console.log(`${new Date().toString()}: Server started`);
setInterval(runTagger, pollInterval);
console.log(`${new Date().toString()}: Polling every ${pollInterval}ms`);
runTagger();
