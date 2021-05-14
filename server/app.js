const fs = require("fs/promises");
const {
  constants: { R_OK },
} = require("fs");
const backup = require("./backup.json");

const file_path = "./access.log";

//fs.access(file_path, R_OK)
//  .then((_) => fs.readFile(file_path))
//  .then((e) => {
//    const lines = e.toString().split("\n");
//    let count = 0;
//    lines.forEach((l) => {
//      const parsedLine = parseLine(l);
//      backupLine(parsedLine).then((_) => {
//        if (++count === lines.length) {
//          fs.writeFile("./backup.json", JSON.stringify(backup));
//        }
//      });
//    });
//  })
//  .catch((e) => console.error(e));
// <==>
fs.access(file_path, R_OK)
  .then((_) => fs.readFile(file_path))
  .then((e) => {
    const lines = e.toString().split("\n");
    return Promise.all(
      lines.map((l) => {
        const parsedLine = parseLine(l);
        return backupLine(parsedLine);
      })
    );
  })
  .then(
    (_) =>
      console.log(_) || fs.writeFile("./backup.json", JSON.stringify(backup))
  )
  .catch((e) => console.error(e));

function parseLine(line) {
  const [, date, app, log] = line.match(/(\d{4}-\d{2}-\d{2}) (\w+) (.*)/);
  return {
    date,
    app,
    log,
  };
}

async function backupLine(line) {
  backup[line.app] ??= {};
  // <=> backup[line.app] = backup[line.app] ?? {};
  backup[line.app][line.date] ??= [];
  backup[line.app][line.date].push(line.log);
}
