const cp = require('child_process');
const pushTags = require('./push-tags');

module.exports = function makeTag(moduleVersion, electronVersion) {
  var tags = cp.execSync('git tag -l').toString();
  var tagName = `ena-${moduleVersion.tag_name}-${electronVersion.tag_name}`;
  if (!~tags.indexOf(tagName)) {
    cp.execSync(`git tag ${tagName}`);

    return pushTags().then(function() {
      console.log(`pushed ${tagName}`);
    });
  }
  return Promise.resolve();
};
