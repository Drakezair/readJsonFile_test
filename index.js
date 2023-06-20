const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const ReadJSONFile = async (path) => {
  try {
    const data = await readFile(path, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw { message: 'File Does Not Exist' };
    } else if (err.code === 'EISDIR') {
      throw { message: 'Path is a directory' };
    } else if (err instanceof SyntaxError) {
      throw { message: 'JSON Invalid' };
    } else {
      throw err;
    }
  }
};

module.exports = ReadJSONFile;
