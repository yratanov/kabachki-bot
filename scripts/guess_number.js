module.exports = function(robot) {
  robot.respond(/начать угадайку/i, function(res) {
    if (robot.brain.get('guessGameStarted')) {
      return res.send('Игра уже идет');
    } else {
      robot.brain.set('guessGameStarted', 1);
      const number = res.random(__range__(0, 10000, true));
      robot.brain.set('guessGameNumber', number);
      res.send('Игра началась! Чтобы угадывать *уг ЧИСЛО*. Удачи!');
    }
  });

  return robot.hear(/уг (\d+)/i, function(res) {
    if (robot.brain.get('guessGameStarted')) {
      const number = parseInt(res.match[1]);
      const myNumber = robot.brain.get('guessGameNumber');
      if (myNumber > number) {
        return res.send(`Мое число больше *${number}*`);
      } else if (myNumber < number) {
        return res.send(`Мое число меньше *${number}*`);
      } else {
        robot.brain.set('guessGameStarted', 0);
        return res.send(`${res.message.user.name} угадал! *${number}* - правильный ответ!`);
      }
    }
  });
};


function __range__(left, right, inclusive) {
  let range = [];
  let ascending = left < right;
  let end = !inclusive ? right : ascending ? right + 1 : right - 1;
  for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i);
  }
  return range;
}
