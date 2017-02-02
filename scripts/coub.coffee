module.exports = (robot)->
  robot.respond /coub ?(.+)?/i, (res)->
    query = res.match[1].trim() if res.match[1]
    robot.http("https://coub.com/api/v2/search?q=#{encodeURIComponent(query)}&order_by=newest_popular")
    .header('Accept', 'application/json')
    .get() (err, httpres, body) ->
      data = JSON.parse body
      res.send "http://coub.com/view/#{res.random(data['coubs'])['permalink']}"

