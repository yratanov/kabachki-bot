fs = require('fs')
readline = require('readline')

linesInFile = 186400

module.exports = (robot, res, callback, wordsCount = 1) ->
  counter = 0
  indexes = [1..wordsCount].map =>
    parseInt(Math.random() * linesInFile, 10)
  words = []
  rl = readline.createInterface(
    input: fs.createReadStream('fixtures/words')
    terminal: false
  )
  done = false
  rl.on 'line', (line) ->
    counter += 1
    if indexes.indexOf(counter) != -1
      words.push line
    if words.length == wordsCount && !done
      done = true
      callback words
      rl.close()
