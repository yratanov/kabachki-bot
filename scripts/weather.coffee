module.exports = (robot) ->
  robot.respond /погода(.*)/i, (res)->
    city = res.match[1].trim()
    city ||= 'Krasnoyarsk,ru'
    robot.http("http://api.openweathermap.org/data/2.5/weather?q=#{encodeURIComponent(city)}")
    .header('Accept', 'application/json')
    .get() (err, httpres, body) ->
      data = JSON.parse body
      temp = data.main.temp - 273.15
      sign = if temp > 0 then '+' else ''
      res.send "#{sign}#{temp.toFixed(2)}˚ in #{data.name}"
