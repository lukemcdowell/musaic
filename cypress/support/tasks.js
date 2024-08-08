const fs = require('fs');
const path = require('path');

const removeDownloadsFolder = () => {
  const downloadsPath = path.join(__dirname, '..', 'downloads');

  return new Promise((resolve, reject) => {
    fs.readdir(downloadsPath, (err, files) => {
      if (err) {
        return reject(err);
      }

      for (const file of files) {
        fs.unlink(path.join(downloadsPath, file), (err) => {
          if (err) {
            return reject(err);
          }
        });
      }

      resolve(null);
    });
  });
};

module.exports = { removeDownloadsFolder };
