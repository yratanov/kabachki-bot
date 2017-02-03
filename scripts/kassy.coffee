module.exports = (robot)->
  robot.respond /хочу афишу/i, (res)->
    cheerio = require('cheerio');
    robot.http("http://kras.kassy.ru/events/koncerty-i-shou/")
    .get() (err, httpres, body) ->
      $ = cheerio.load(body)
      schedule = {}
      $('#content .events li').each((i, el) =>
        schedule[$(el).find('h1').text()] = $(el).find('p a').text()
      )
      text = for artist, place of schedule
        "*#{artist}*: #{place}"
      res.send ">>>#{text.join('\n')}"
