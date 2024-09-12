// .electron-delta.js
const DeltaBuilder = require("@electron-delta/builder");

const path = require("path");
// const getPreviousReleases = require("./build_scripts/get-previous-releases"); // OJOOJO!! comentado

// const getPreviousReleases = async () => { // OJOOJO! nuevo
//   return [];
// };

const getPreviousReleases = async () => { // OJOOJO! nuevo
  return [
    {
      version: '1.0.1',
      url: 'http://localhost:5123/electron-delta-sample-app-1.0.1.exe',
    },
    {
      version: '1.0.0',
      url: 'http://localhost:5123/electron-delta-sample-app-1.0.0.exe',
    }
  ];
};

const options = {
  productIconPath: path.join(__dirname, "icon.ico"),
  productName: "electron-sample-app",
  cache: path.join(__dirname, "./cache"),
  getPreviousReleases: ({ platform, target }) => {
    console.log("getPreviousReleases", platform, target);
    return getPreviousReleases({ platform, target });
  },
  sign: async (filePath) => {
    // sign each delta executable
    return filePath;
  },
};

exports.default = async function (context) {
  const deltaInstallerFiles = await DeltaBuilder.build({
    context,
    options,
  });
  return deltaInstallerFiles;
};
