module.exports = (robot)->
  robot.respond /песенка( от (.+))?/i, (res)->
    users = ['k666r6', 'cryomorph', 'organium', 'varg90']
    user = res.match[2].trim() if res.match[2]
    user ||= res.random users
    robot.http("http://www.last.fm/player/station/user/#{encodeURIComponent(user)}/library")
    .header('Accept', 'application/json')
    .get() (err, httpres, body) ->
      try
        data = JSON.parse body
        track = res.random data.playlist
        res.send "Песенка от #{user}: #{track.playlinks[0].url}"
      catch
        res.send "Нет песенок у #{user}"
