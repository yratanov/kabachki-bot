/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
module.exports = robot =>
  robot.respond(/.+? или .+/i, function(res) {
    const results = res.message.match(/(.+?)((?= или )|(?=$))/gi).map(el => {
      return el.replace(' или ', '').replace(robot.name, '').replace(/@|:/, '').trim();
    });
    return res.send(res.random(results));
  })
;
