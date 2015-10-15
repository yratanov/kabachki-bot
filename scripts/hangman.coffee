MAXIMUM_TRIES = 9

win = (res, robot) ->
  word = robot.brain.get('hangmanGameWord')
  res.send "Вы выиграли! Слово: *#{word}*! :tada:"
  robot.brain.set('hangmanGameStarted', 0)

fail = (res, robot, letter) ->
  word = robot.brain.get('hangmanGameWord')
  tries = robot.brain.get('hangmanGameTries') + 1
  if tries == MAXIMUM_TRIES
    res.send "Вы проиграли :disappointed:. Мое слово *#{word}*."
    robot.brain.set('hangmanGameStarted', 0)
    return
  robot.brain.set('hangmanGameTries', tries)
  triesLeft = MAXIMUM_TRIES - tries
  ending = if triesLeft == 1
    'ка'
  else
    'ки'
  res.send "Буквы *#{letter}* нет в моем слове :wink:. Осталось #{MAXIMUM_TRIES - tries} попыт#{ending}."

module.exports = (robot)->
  robot.respond /начать виселицу/i, (res)->
    if robot.brain.get('hangmanGameStarted')
      res.send 'Игра уже идет'
    else
      randomWord = require('./lib/random_word')
      randomWord robot, res, (words)->
        word = words[0]
        console.log word
        robot.brain.set('hangmanGameStarted', 1)
        robot.brain.set('hangmanGameWord', word)
        robot.brain.set('hangmanGameTries', 0)
        robot.brain.set('hangmanGameHint', word.split('').map -> '_')
        res.send "`#{robot.brain.get('hangmanGameHint').join(' ')}`"
        res.send 'Игра началась! Чтобы угадывать *ви БУКВА*. Удачи!'

  robot.hear /ви ([а-я]+)/i, (res)->
    if robot.brain.get('hangmanGameStarted')
      letter = res.match[1]
      word = robot.brain.get('hangmanGameWord')
      hint = robot.brain.get('hangmanGameHint')

      if letter.length > 1
        if word == letter
          win(res, robot)
          return
        else
          fail(res, robot, letter)
          return


      if hint.indexOf(letter) != -1
        res.send "Эта буква уже использована!"
        return

      if word.indexOf(letter) != -1
        index = word.indexOf(letter)
        while index != -1
          hint[index] = letter
          index = word.indexOf(letter, index + 1)

        if hint.indexOf('_') == -1
          win(res, robot)
        else
          robot.brain.set('hangmanGameHint', hint)
          res.send "`#{hint.join(' ')}`"
      else
        fail(res, robot, letter)
        res.send "`#{hint.join(' ')}`"
