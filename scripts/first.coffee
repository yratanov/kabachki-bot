module.exports = (robot)->
  robot.respond /give some song/i, (res)->
    robot.http("http://www.last.fm/player/station/user/k666r6/library")
    .header('Accept', 'application/json')
    .get() (err, httpres, body) ->
      data = JSON.parse body
      index = Math.floor(Math.random() * data.playlist.length)
      res.send data.playlist[index].playlinks[0].url
