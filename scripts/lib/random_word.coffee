fs = require('fs')
readline = require('readline')

linesInFile =
  noun: 34000
  adjective: 6463
  verb: 9420
  anagrams: 6259

module.exports = (res, callback, partOfSpeech = 'noun', wordsCount = 1) ->
  counter = 0
  indexes = [1..wordsCount].map =>
    parseInt(Math.random() * linesInFile[partOfSpeech], 10)
  words = []
  rl = readline.createInterface(
    input: fs.createReadStream("fixtures/#{partOfSpeech}")
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
