connectors = [
  'в'
  'за'
  'а то'
  'но'
  'на'
  'при этом'
  'так то'
]

module.exports = (robot)->
  robot.respond /скажи, (.+)\?/i, (res)->
    randomExistingWord = res.random res.match[1].split(' ')
    randomConnector = res.random connectors
    robot.http("http://randomword.pythonanywhere.com/get/#{res.random([3..10])}/2")
    .header('Accept', 'application/json')
    .get() (err, httpres, body) ->
      try
        data = JSON.parse body
        words = data.map (data) ->
          data.fields.word

        res.send "#{randomExistingWord} #{res.random connectors} #{words.join(" #{res.random connectors} ")}"
