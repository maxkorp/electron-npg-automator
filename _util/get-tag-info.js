module.exports = function getTagInfo() {
  return new Promise((resolve, reject) => {
    var tag = getTag();
    if (!tag) {
      return reject('no tag');
    }

    const [moduleVersion, electronVersion] = tag.split('-');
    resolve([moduleVersion, electronVersion]);
  });
}

function getTag() {
  switch (process.platform) {
    case 'win32':
      return process.env.APPVEYOR_REPO_TAG_NAME;
    case 'linux':
    case 'darwin':
      return process.env.TRAVIS_TAG;
  }
}
