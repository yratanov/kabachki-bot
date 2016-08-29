getResults = (robot) ->
  results = robot.brain.get('anagramGameResults')
  if !results
    {}
  else
    JSON.parse(results)

addToResult = (robot, userName, count) ->
  results = getResults(robot)
  results[userName] ||= 0
  results[userName] += count
  robot.brain.set('anagramGameResults', JSON.stringify(results))

getNewWord = (res, robot) ->
  randomWord = require('./lib/random_word')
  randomWord res, (words)->
    anagrams = words[0].split(' - ')
    size = anagrams.length
    randomIndex = parseInt(Math.random() * size)
    answers = anagrams.filter (el, index) -> index != randomIndex
    robot.brain.set('anagramGameWord', anagrams[randomIndex])
    robot.brain.set('anagramAnswers', answers)
    robot.brain.set('anagramGameStarted', true)
    res.send "Найди анаграмму для слова *#{robot.brain.get('anagramGameWord')}*"
    res.send "если знаешь, то пиши *ан СЛОВО*"
    res.send "для вызова статистики пиши *статистика анаграмм*"
  , 'anagrams'


module.exports = (robot)->
  robot.respond /анаграмма/i, (res)->
    robot.brain.set('anagramGameStarted', false)
    if robot.brain.get('anagramGameStarted')
      res.send "Уже запущена! Найди анаграмму для слова *#{robot.brain.get('anagramGameWord')}*"
      res.send "если знаешь, то пиши *ан СЛОВО*"
      res.send "для вызова статистики пиши *статистика анаграмм*"
    else
      getNewWord(res, robot)

  robot.hear /ан ([а-я]+)/i, (res)->
    if robot.brain.get('anagramGameStarted')
      answer = res.match[1]

      foundAnswer = robot.brain.get('anagramAnswers').find (word) =>
        word.toUpperCase().indexOf(answer.toUpperCase()) != -1
      if foundAnswer
        count = parseInt(foundAnswer.match(/\((\d+)/)[1])
        res.send "Анаграммы: #{res.message.user.name} получает #{count} очков! :tada:"
        addToResult(robot, res.message.user.name, count)
        getNewWord(res, robot)
      else
        res.send "Анаграммы: неправильно!"

  robot.hear /статистика анаграмм/i, (res)->
    for user, result of getResults(robot)
      res.send "*#{user}*: #{result}"

