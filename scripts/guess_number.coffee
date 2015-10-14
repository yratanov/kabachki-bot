module.exports = (robot)->
  robot.respond /начать угадайку/i, (res)->
    if robot.brain.get('guessGameStarted')
      res.send 'Игра уже идет'
    else
      robot.brain.set('guessGameStarted', 1)
      number = res.random([0..10000])
      console.log(number)
      robot.brain.set('guessGameNumber', number)
      res.send 'Игра началась! Чтобы угадывать *уг ЧИСЛО*. Удачи!'

  robot.hear /уг (\d+)/i, (res)->
    if robot.brain.get('guessGameStarted')
      number = parseInt(res.match[1])
      myNumber = robot.brain.get('guessGameNumber')
      if myNumber > number
        res.send "Мое число больше *#{number}*"
      else if myNumber < number
        res.send "Мое число меньше *#{number}*"
      else
        robot.brain.set('guessGameStarted', 0)
        res.send "#{res.message.user.name} угадал! *#{number}* - правильный ответ!"

