module.exports = (robot)->
  robot.respond /.+? или .+/i, (res)->
    results = res.message.match(/(.+?)((?= или )|(?=$))/gi).map (el) =>
      el.replace(' или ', '').replace(robot.name, '').replace('@', '').trim()
    res.send res.random results
