const fs = require('fs');
const path = require('path');
const moduleParentPath = require('./module-parent-path');

module.exports = function modulePath() {
  var parentPath = moduleParentPath();
  var childDir = fs.readdirSync(parentPath)[0];
  console.log(path.join(parentPath, childDir))
  return path.join(parentPath, childDir);
};
