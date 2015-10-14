connectors = [
  'в'
  'за'
  'а то'
  'но'
  'на'
  'при этом'
  'так то'
  'будто'
  'вместо'
  'вслед за'
  'внезапно'
  'станет'
  'был'
  'из'
  'через'
  'с'
  'над'
  'об'
  'про'
  'под'
  'красивый'
  'нелепый'
  'знатный'
  'матерый'
  'убогий'
  'сонный'
  'ленивый'
  'глупый'
  'перламутровый'
  'сказочный'
  'жуткий'
  'амбивалентный'
  'креативный'
  'грозный'
  'косой'
  'смачный'
  'березовый'
  'дубовый'
  'круглолицый'
  'паразитарный'
  'красочный'
  'милый'
  'грандиозный'
  'тойный'
  'грибной'
  'кабачковый'
  'странный'
  'попал'
  'сломал'
  'достал'
  'лихой'
  'модный'
  'злобный'
  'кариозный'
  'простудный'
  'ночной'
  'бородатый'
  'хромой'
]

module.exports = (robot)->
  robot.respond /скажи, (.+)\?/i, (res)->
    randomExistingWord = res.random res.match[1].split(' ')
    robot.http("http://randomword.pythonanywhere.com/get/#{res.random([3..10])}/1")
    .header('Accept', 'application/json')
    .get() (err, httpres, body) ->
      try
        data = JSON.parse body
        words = data.map (data) ->
          data.fields.word

        res.send "#{randomExistingWord} #{res.random connectors} #{words.join(" #{res.random connectors} ")}"
