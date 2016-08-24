getRandom = (res, type, words) =>
  randomWord = require('./lib/random_word')
  randomWord res, (word)=>
    words[type] = word
    console.log words
    if words.adjective && words.noun && words.verb
      res.send "#{words.randomExistingWord} #{words.verb} #{words.adjective} #{words.noun}"
  , type

module.exports = (robot)->
  robot.respond /скажи(,)? (.+)\?/i, (res)->
    words =
      randomExistingWord: res.random res.match[2].split(' ')
      adjective: ''
      noun: ''
      verb: ''
    getRandom(res, 'noun', words)
    getRandom(res, 'verb', words)
    getRandom(res, 'adjective', words)

