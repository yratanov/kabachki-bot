const fs = require('fs');
const http = require('http');

module.exports = robot => {
  function sendPhoto(chatId, photoUrl) {
    let tempFileName = '/tmp/tempImage.png';
    http.get(photoUrl, (response) => {
      response.pipe(fs.createWriteStream(tempFileName))
        .on('finish', () => {
          robot.emit('telegram:invoke', 'sendPhoto', {
            chat_id: chatId,
            photo: fs.createReadStream(tempFileName)
          }, function(error, response) {
            console.log(error);
            fs.unlink(tempFileName, console.log)
          });

        })
    })
  }

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
      sendPhoto(res.message.room, url + point.id);
    } else {
      res.send('Точка не найдена с данными ' + data)
    }
  });
};
