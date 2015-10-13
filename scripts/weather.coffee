module.exports = (robot) ->
  robot.respond /погода(.*)/i, (res)->
    city = res.match[1].trim()
    city ||= 'Krasnoyarsk,ru'
    robot.http("http://api.openweathermap.org/data/2.5/weather?q=#{encodeURIComponent(city)}&APPID=0b0c5b25311c459209556d01b5f0c99f&lang=ru&units=metric")
    .header('Accept', 'application/json')
    .get() (err, httpres, body) ->
      data = JSON.parse body
      temp = data.main.temp
      sign = if temp > 0 then '+' else ''
      descriptions = data.weather.map (weather) => weather.description
      res.send "#{sign}#{temp.toFixed(2)}˚, #{descriptions.join(', ')} в #{data.name}"
