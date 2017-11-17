getRandom = (res, type, words) =>
  randomWord = require('./lib/random_word')
  randomWord res, (word)=>
    words[type] = word
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

module.exports = (robot)->
  robot.respond /сколько (.+)\?/i, (res)->
    randomWord = require('./lib/random_word')
    number = if Math.random() * 2 > 1
      res.random('двадцать тридцать сорок пятьдесят шестьдесят семьдесят восемдесят девяносто сто'.split(' '))

    if number
      number += ' ' + res.random('один два три четыре пять шесть семь восемь девять'.split(' '))
    else
      number = res.random('десять одиннадцать двенадцать триндцать четырнадцать пятнадцать шестнадцать семнадцать восемнадцать девятнадцать'.split(' '))
    randomWord res, (word)=>
      res.send "#{number} #{word}"
    , 'noun'

module.exports = (robot)->
  robot.respond /почему (.+)\?/i, (res)->
    randomWord = require('./lib/random_word')
    randomWord res, (word)=>
      res.send "потому что #{word}"
    , 'verb'


module.exports = (robot)->
  robot.respond /как(ой|ая) (.+)\?/i, (res)->
    randomWord = require('./lib/random_word')
    randomWord res, (word)=>
      itIs = if res.match[1] == 'ой'
        'он такой... '
      else
        'она такая...'
      res.send "#{itIs} #{word}"
    , 'adjective'

