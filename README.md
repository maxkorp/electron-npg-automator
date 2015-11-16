# electron-npg-automator
Automate node-pre-gyp deployment of native modules for electron

This is a small tool meant to allow you to publish new builds of your
[native node addon](https://nodejs.org/api/addons.html) for node-pre-gyp
whenever a new version of either your module or of electron is published.

### How it works
This module polls the github APIs hourly, looking for the latest published
releases of your module and of electron.
##### Note: This requires you to publish releases on github, not just to push tags.
It then tags itself with tags specifying the 2 most recent versions of both
electron and your module, so that any of the 4 resulting builds that don't
already exist will be published. [Appveyor](https://appveyor.com) and
[Travis](https://travis-ci.org) will pick up these tags, and do builds, which
then get published to AWS using [node-pre-gyp](https://github.com/mapbox/node-pre-gyp).


### Setup and Configuration
First, fork the repo. It needs to be published to Github for Appveyor and Travis
to work. Configure appveyor and travis against your repo for tag events.
Install is just `npm install`, and to run the server use `npm start`.
Basic configuration is set up by either a config file `config.js/config.json` in
the root of the folder, or by environment variables. Environment variable names are
all prefixed with `electron_npg_automator_` (e.g. `electron_npg_automator_remote`)

<table>
  <tr>
    <td>What</td>
    <td>json</td>
    <td>example</td>
    <td>default</td>
  </tr>
  <tr>
    <td>Module</td>
    <td>module</td>
    <td>'myorg/mymodule'</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td>Remote</td>
    <td>remote</td>
    <td>'upstream'</td>
    <td>'origin'</td>
  </tr>
  <tr>
    <td>Github Access Token</td>
    <td>gh_token</td>
    <td>'adf234234134141212'</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td>Poll Interval in milliseconds</td>
    <td>poll_interval</td>
    <td>3600000 (1hr)</td>
    <td>86400000</td>
  </tr>
</table>

Additionally, you can add a script `ci/custom_prepare.js`. This script should return
a promise, which resolves is preparation was successful. The default behavior if no
custom script is in place is to run `npm intall` in your modules directory. Use a custom
script if you have any custom installation steps you need done before compilation.
