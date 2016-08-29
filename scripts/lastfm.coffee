getSong = (res, playlist) ->
  track = res.random playlist
  url = ''
  track.playlinks.forEach (data)=>
    url = data.url if data.affiliate is 'youtube'
  if url
    [track.artists[0].name, track.name, url]


module.exports = (robot)->
  robot.respond /песенка( от (.+))?/i, (res)->
    users = ['k666r6', 'cryomorph', 'organium', 'varg90']
    user = res.match[2].trim() if res.match[2]
    user ||= res.random users
    robot.http("http://www.last.fm/player/station/user/#{encodeURIComponent(user)}/library")
    .header('Accept', 'application/json')
    .get() (err, httpres, body) ->
      data = JSON.parse body
      for i in [1..20]
        [artist, track, url] = getSong(res, data.playlist)
        break if url

      if url
        res.send "Песенка от *#{user}*: *#{artist} - #{track}*: #{url}"
      else
        res.send "Нет ссылочки с Youtube"

  robot.respond /включи (.+)/i, (res)->
    tag = res.match[1]
    console.log tag
    robot.http("http://www.last.fm/player/station/tag/#{encodeURIComponent(tag)}")
    .header('Accept', 'application/json')
    .get() (err, httpres, body) ->
      data = JSON.parse body
      for i in [1..20]
        [artist, track, url] = getSong(res, data.playlist)
        break if url

      if url
        res.send "Песенка c тэгом *#{tag}*: *#{artist} - #{track}*: #{url}"
      else
        res.send "Нет ссылочки с Youtube"
