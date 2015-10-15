module.exports = (robot, res, callback, wordSize, wordsCount = 1) ->
  wordSize ||= res.random([4..10])
  robot.http("http://randomword.pythonanywhere.com/get/#{wordSize}/#{wordsCount}")
  .header('Accept', 'application/json')
  .get() (err, httpres, body) ->
    data = JSON.parse body
    words = data.map (data) ->
      data.fields.word
    callback words
