/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const MAXIMUM_TRIES = 9;

const win = function(res, robot) {
  const word = robot.brain.get('hangmanGameWord');
  res.send(`Вы выиграли! Слово: *${word}*! :tada:`);
  return robot.brain.set('hangmanGameStarted', 0);
};

const fail = function(res, robot, letter) {
  const word = robot.brain.get('hangmanGameWord');
  const tries = robot.brain.get('hangmanGameTries') + 1;
  if (tries === MAXIMUM_TRIES) {
    res.send(`Вы проиграли :disappointed:. Мое слово *${word}*.`);
    robot.brain.set('hangmanGameStarted', 0);
    return;
  }
  robot.brain.set('hangmanGameTries', tries);
  const triesLeft = MAXIMUM_TRIES - tries;
  const ending = triesLeft === 1 ? 'ка' : 'ки';
  return res.send(`Буквы *${letter}* нет в моем слове :wink:. Осталось ${MAXIMUM_TRIES - tries} попыт${ending}.`);
};

module.exports = function(robot) {
  robot.respond(/начать виселицу/i, function(res) {
    if (robot.brain.get('hangmanGameStarted')) {
      return res.send('Игра уже идет');
    } else {
      const randomWord = require('./lib/random_word');
      return randomWord(res, function(words) {
        const word = words[0];
        console.log(word);
        robot.brain.set('hangmanGameStarted', 1);
        robot.brain.set('hangmanGameWord', word);
        robot.brain.set('hangmanGameUsedLetters', []);
        robot.brain.set('hangmanGameTries', 0);
        robot.brain.set('hangmanGameHint', word.split('').map(() => '_'));
        res.send(`\`${robot.brain.get('hangmanGameHint').join(' ')}\``);
        return res.send('Игра началась! Чтобы угадывать *ви БУКВА*. Удачи!');
      });
    }
  });

  return robot.hear(/ви ([а-я]+)/i, function(res) {
    if (robot.brain.get('hangmanGameStarted')) {
      const letter = res.match[1];
      const word = robot.brain.get('hangmanGameWord');
      const hint = robot.brain.get('hangmanGameHint');
      const usedLetters = robot.brain.get('hangmanGameUsedLetters');

      if (letter.length > 1) {
        if (word === letter) {
          win(res, robot);
          return;
        } else {
          fail(res, robot, letter);
          return;
        }
      }

      if (usedLetters.indexOf(letter) !== -1) {
        res.send("Эта буква уже использована!");
        return;
      }

      usedLetters.push(letter);
      robot.brain.set('hangmanGameUsedLetters', usedLetters);

      if (word.indexOf(letter) !== -1) {
        let index = word.indexOf(letter);
        while (index !== -1) {
          hint[index] = letter;
          index = word.indexOf(letter, index + 1);
        }

        if (hint.indexOf('_') === -1) {
          return win(res, robot);
        } else {
          robot.brain.set('hangmanGameHint', hint);
          return res.send(`\`${hint.join(' ')}\``);
        }
      } else {
        fail(res, robot, letter);
        return res.send(`\`${hint.join(' ')}\``);
      }
    }
  });
};
