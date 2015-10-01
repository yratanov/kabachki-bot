module.exports = (robot)->
  users = ['k666r6', 'cryomorph', 'organium', 'varg90']
  robot.respond /give some song/i, (res)->
    users = ['k666r6', 'cryomorph', 'organium', 'varg90']
    user = res.random users
    robot.http("http://www.last.fm/player/station/user/#{user}/mix")
    .header('Accept', 'application/json')
    .get() (err, httpres, body) ->
      data = JSON.parse body
      track = res.random data.playlist
      res.send track.playlinks[0].url
