const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');

const PATH = './dist/Website-Pfarre-Machstrasse';
// find the styles css file
const files = getFilesFromPath(PATH, '.css');
let data = [];

if (!files && files.length <= 0) {
  console.warn("cannot find style files to purge");
  return;
}

for (let f of files) {
  // get original file size
  const originalSize = getFilesizeInKiloBytes(PATH + '/' + f) + "kb";
  data.push({"file": f, "originalSize": originalSize, "newSize": ""});
}

console.log("Run PurgeCSS...");

exec(`purgecss -css ${PATH}/*.css --content ${PATH}/index.html ${PATH}/*.js -o ${PATH}/ --config ./purgecss.config.js`, (error, stdout, stderr) => {
  console.log("PurgeCSS done");
  console.log();

  for (let d of data) {
    // get new file size
    d.newSize = getFilesizeInKiloBytes(PATH + '/' + d.file) + "kb";
  }

  console.table(data);
});

console.log("Replace special variables...");

for (const file of ['index.html', 'manifest.json']) {
  replaceVariablesInFile(`${PATH}/${file}`, {
    'theme_color': '#3f51b5',
    'bg_color': '#303030',
    'base_url': 'https://minecraftschurli.ddns.net/pfarre-machstrasse'
  });
}

function replaceVariablesInFile(filename, replacements) {
  fs.readFile(filename, 'utf8', (err,data) => {
    if (err) {
      return console.error(err);
    }
    let result = data.replace(/"@([^@]+)@"/g, (substring, variableName) => {
      return `"${replacements[variableName]}"`;
    });

    fs.writeFile(filename, result, 'utf8', (err) => {
      if (err) {
        return console.error(err);
      }
    });
  });
}

function getFilesizeInKiloBytes(filename) {
  return (fs.statSync(filename).size / 1024).toFixed(2);
}

function getFilesFromPath(dir, extension) {
  return fs.readdirSync(dir).filter(e => path.extname(e).toLowerCase() === extension);
}
