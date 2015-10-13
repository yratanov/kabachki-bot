module.exports = (robot)->
  robot.respond /(посчитай|calc|сколько\sбудет) (.+)/i, (res)->
    cheerio = require('cheerio');
    expression = res.match[2].trim()
    robot.http("https://www.google.ru/search?q=calculate #{encodeURIComponent(expression)}")
    .get() (err, httpres, body) ->
      $ = cheerio.load(body)
      answer = $('#cwos').text()
      if answer
        res.send ">>>#{answer}"
      else
        res.send ">Вы что-то не то вычисляете, либо вычислятор вас не понял"
