module.exports = robot =>
  robot.respond(/погода(.*)/i, function(res) {
    let city = res.match[1].trim();
    if (!city) {
      city = 'Krasnoyarsk,ru';
    }
    return robot.http(`http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&APPID=0b0c5b25311c459209556d01b5f0c99f&lang=ru&units=metric`)
      .header('Accept', 'application/json')
      .get()(function(err, httpres, body) {
        const data = JSON.parse(body);
        const { temp } = data.main;
        const sign = temp > 0 ? '+' : '';
        const descriptions = data.weather.map(weather => weather.description);
        return res.send(`${sign}${temp.toFixed(2)}˚, ${descriptions.join(', ')} в ${data.name}`);
      });
  })
;
