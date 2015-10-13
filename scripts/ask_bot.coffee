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
  'внезано'
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
]

module.exports = (robot)->
  robot.respond /скажи, (.+)\?/i, (res)->
    randomExistingWord = res.random res.match[1].split(' ')
    robot.http("http://randomword.pythonanywhere.com/get/#{res.random([3..10])}/2")
    .header('Accept', 'application/json')
    .get() (err, httpres, body) ->
      try
        data = JSON.parse body
        words = data.map (data) ->
          data.fields.word

        res.send "#{randomExistingWord} #{res.random connectors} #{words.join(" #{res.random connectors} ")}"
