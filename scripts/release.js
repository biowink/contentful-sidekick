const sh = require('shelljs');
const fs = require('fs');

const manifestPath = 'src/chrome/manifest.json';

const updatedVersion = updatePackageVersion();
updateManifestVersion(updatedVersion);
tagAndCommit(updatedVersion);

function updatePackageVersion() {
  const version = sh.exec('npm --no-git-tag-version version patch').stdout;
  return version.slice(1).trim();
}

function updateManifestVersion(version) {
  const manifestJson = JSON.parse(fs.readFileSync(manifestPath));
  manifestJson.version = version;
  fs.writeFileSync(manifestPath, JSON.stringify(manifestJson, null, 2));
}

function tagAndCommit(version) {
  sh.exec('git add *');
  sh.exec(`git commit -m 'release: v${version}'`);
  sh.exec(`git tag v${version}`);
}
