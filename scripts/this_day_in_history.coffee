months = [
  'января'
  'февраля'
  'марта'
  'апреля'
  'мая'
  'июня'
  'июля'
  'августа'
  'сентября'
  'октября'
  'ноября'
  'декабря'
]

todayInHistory = (robot, res) ->
  cheerio = require('cheerio')
  date = new Date
  [day, month] = [date.getDate(), date.getMonth()]
  month = months[month]
  robot.http("https://ru.wikipedia.org/wiki/#{day}_#{encodeURIComponent(month)}")
  .get() (err, httpres, body) ->
    $ = cheerio.load(body)
    text = $('h2:contains("События") + p ~ ul').slice(1, 3).map((i, el) =>
      $(el).find('li').map((i, li) =>
        $(li).text()
      ).get().join('\n')
    ).get().join('\n')
    res.send '>>>' + text

module.exports = (robot)->
  robot.respond /сегодня в истории/i, (res)->
    todayInHistory(robot, res)
    setInterval () ->
      todayInHistory(robot, res)
    , 1000*60*60*24
