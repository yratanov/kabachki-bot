module.exports = robot =>
  robot.respond(/coub ?(.+)?/i, function(res) {
    let query;
    if (res.match[1]) {
      query = res.match[1].trim();
    }
    return robot.http(`https://coub.com/api/v2/search?q=${encodeURIComponent(query)}&order_by=newest_popular`)
      .header('Accept', 'application/json')
      .get()(function(err, httpres, body) {
        const data = JSON.parse(body);
        return res.send(`http://coub.com/view/${res.random(data['coubs'])['permalink']}`);
      });
  })
;

