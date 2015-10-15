connectors = [
  'в'
  'за'
  'а то'
  'но'
  'на'
  'и'
  'при этом'
  'так то'
  'будто'
  'вместо'
  'вслед за'
  'внезапно'
  'из'
  'через'
  'с'
  'над'
  'об'
  'про'
  'под'
  ''
]

verbs = [
  'спал'
  'копал'
  'борол'
  'носил'
  'косил'
  'дробил'
  'зажал'
  'мочил'
  'забыл'
  'попал'
  'сломал'
  'достал'
  'станет'
  'был'
  'пошел'
  'сломил'
  'сбрил'
  'отрастил'
  'поработил'
  'откромсал'
  'улетел'
  ''
]

adjectives = [
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
  'лихой'
  'модный'
  'злобный'
  'кариозный'
  'простудный'
  'ночной'
  'бородатый'
  'хромой'
  ''
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

        res.send "#{randomExistingWord} #{res.random verbs} #{res.random adjectives} #{words.join(" #{res.random connectors} ")}"
