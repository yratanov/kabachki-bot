module.exports = (robot)->
  robot.respond /курс/i, (res)->
    cheerio = require('cheerio');
    robot.http("http://www.cbr.ru/scripts/XML_daily.asp")
    .get() (err, httpres, body) ->
      $ = cheerio.load(body)
      selector = '[ID="R01035"], [ID="R01090"],[ID="R01235"],[ID="R01239"],[ID="R01760"],[ID="R01375"]'
      text = $(selector).map((i, el) =>
        "*#{$(el).find('Nominal').text()} #{$(el).find('CharCode').text()}*: #{$(el).find('Value').text()}"
      ).get().join('\n')
      res.send ">>>#{text}"
