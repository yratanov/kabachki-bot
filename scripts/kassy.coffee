module.exports = (robot)->
  robot.respond /хочу афишу/i, (res)->
    cheerio = require('cheerio');
    robot.http("http://kras.kassy.ru/koncerty-i-shou/events/")
    .get() (err, httpres, body) ->
      $ = cheerio.load(body)
      schedule = {}
      $('#content .repertuar').each((i, el) =>
        schedule[$(el).find('h1').text()] = $(el).find('.building').text()
      )
      text = for artist, place of schedule
        "*#{artist}*: #{place}"
      res.send ">>>#{text.join('\n')}"
