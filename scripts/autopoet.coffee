module.exports = (robot)->
  robot.respond /стишок/i, (res)->
    robot.http("https://autopoet.yandex.ru")
    .get() (err, httpres, body) ->
      try
        poem = body.match(/<div class="poem__text">(.*?)<\/div>/)[1]
        res.send ">>>#{poem.replace(/(<[|/]?p>|<br\s*[\/]?>)/gi, '\n')}"
      catch
        res.send ">Болсушок"
