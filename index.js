console.log("działa");
console.log(__filename);

// FS - read files

const fs = require("fs").promises;

// old syntax

// fs.readdir(__dirname)
//   .then((files) => {
//     console.log(files);
//     return Promise.all(
//       files.map(async (filename) => {
//         const stats = await fs.stat(filename);
//         return {
//           name: filename,
//           size: stats.size,
//           date: stats.mtime,
//           isFolder: stats.isDirectory(),
//         };
//       })
//     );
//   })
//   .then((result) => {
//     console.table(result);
//   });

// new syntax

const readDirectory = async () => {
  const files = await fs.readdir(__dirname);
  const filesStats = await Promise.all(
    files.map(async (filename) => {
      const stats = await fs.stat(filename);
      return {
        name: filename,
        size: stats.size,
        date: stats.mtime,
        isFolder: stats.isDirectory(),
      };
    })
  );
  console.table(filesStats);
};

readDirectory();

// Buffer

fs.readFile("readme.md")
  .then((data) => {
    //Buffer
    const string = data.toString();
    console.log(string);
  })
  .catch((err) => {
    console.log('ERROR -> '+err.message);
  });

// read object

  fs.readFile("./db/contacts.json")
    .then((data) => {
      //Buffer
        const string = data.toString();
        const object = JSON.parse(string)
      console.log(object[0].name);
    })
    .catch((err) => {
      console.log("ERROR -> " + err.message);
    });