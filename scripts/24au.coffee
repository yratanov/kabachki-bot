AU_BASE_URL = "http://krsk.24au.ru"

module.exports = (robot)->
  robot.respond /что купить/i, (res)->
    cheerio = require('cheerio');
    robot.http("#{AU_BASE_URL}/auction/?filter=default")
    .get() (err, httpres, body) ->
      $ = cheerio.load(body)
      selector = '.lotcard:not(.lotcard-lemoncream) a.lotcard-name'
      links = $(selector).map((i, el) =>
        $(el).attr('href')
      ).get()
      res.send "#{AU_BASE_URL}#{res.random(links)}"
