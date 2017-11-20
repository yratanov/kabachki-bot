const fs = require('fs');
const readline = require('readline');

const linesInFile = {
  noun: 34000,
  adjective: 6463,
  verb: 9420,
  anagrams: 6259
};

module.exports = async function(res, partOfSpeech = 'noun', wordsCount = 1) {
  let counter = 0;
  const indexes = [...new Array(wordsCount).keys()].map(() => {
    return parseInt(Math.random() * linesInFile[partOfSpeech], 10);
  });
  const words = [];
  const rl = readline.createInterface({
    input: fs.createReadStream(`fixtures/${partOfSpeech}`),
    terminal: false
  });
  let done = false;

  return new Promise((resolve) => {
    rl.on('line', function(line) {
      counter += 1;
      if (indexes.indexOf(counter) !== -1) {
        words.push(line);
      }
      if ((words.length === wordsCount) && !done) {
        done = true;
        rl.close();
        resolve(words);
      }
    });
  });
};
