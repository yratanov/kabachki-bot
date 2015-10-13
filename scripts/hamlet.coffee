module.exports = (robot)->
  robot.respond /(.+?) (или|or) (.+)/i, (res)->
    first = res.match[1].trim()
    second = res.match[3].trim()
    answers = [first, second, 'Оба варианта', 'Ни то, ни другое']
    res.send res.random answers
