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
        url = ''
        track.playlinks.forEach (data)=>
          url = data.url if data.affiliate is 'youtube'
        if url
          res.send "Песенка от *#{user}*: #{url}"
        else
          res.send "Нет ссылочки с youtube для *#{track.name}*"
      catch
        res.send "Нет песенок у *#{user}*\nКак жаль..."
