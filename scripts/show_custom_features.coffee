module.exports = (robot)->
  robot.respond /что умеешь?/i, (res)->
    res.send "*что купить*\n*стишок*\n*хочу афишу*\n*песенка[ от vasiliy]*\n*курс*\n*погода[ Москва]*\n"
