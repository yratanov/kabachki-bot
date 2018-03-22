module.exports = robot =>
  robot.respond(/небо ?(.+)?/i, function(res) {
    let url = 'http://krasnoyarsknebo.ru/share/';
    let point;
    let points = [
      { title: 'свердловская', id: '1', },
      { title: 'комсомольский', id: '2', },
      { title: 'железнодорожников', id: '3', },
      { title: 'копылова', id: '6', },
      { title: 'юности', id: '13', },
      { title: 'павлова', id: '14', },
      { title: 'перенсона', id: '17', },
      { title: 'ады', id: '18', },
      { title: 'киренского', id: '21', },
      { title: 'щорса', id: '22', },
      { title: 'базаиха', id: '25', },
    ];
    let data = res.match[1];
    if (!data) {
      return res.send(points.map(p => p.title).join("\n"));
    }
    point = points.find((p) => p.id === data || p.title === data.toLowerCase());
    if (point) {
      res.send(url + point.id);
    } else {
      res.send('Точка не найдена с данными ' + data)
    }
  });
