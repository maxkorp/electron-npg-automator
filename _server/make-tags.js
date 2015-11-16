const cp = require('child_process');

module.exports = function makeTags(versions) {
  return new Promise((resolve, reject) => {
    var tags = cp.execSync('git tag -l').toString();
    var output = [];
    versions.electron.forEach((electronVersion) => {
      versions.module.forEach((moduleVersion) => {
        var tagName = `${moduleVersion.tag_name}-${electronVersion.tag_name}`;
        if (!~tags.indexOf(tagName)) {
          cp.execSync(`git tag ${tagName}`);

          output.push(tagName);
        }
      });
    });

    resolve(output);
  });
};
