const getResults = function(robot) {
  const results = robot.brain.get('anagramGameResults');
  if (!results) {
    return {};
  } else {
    return JSON.parse(results);
  }
};

const addToResult = function(robot, userName, count) {
  const results = getResults(robot);
  if (!results[userName]) {
    results[userName] = 0;
  }
  results[userName] += count;
  return robot.brain.set('anagramGameResults', JSON.stringify(results));
};

const getNewWord = function(res, robot) {
  const randomWord = require('./lib/random_word');
  return randomWord(res, function(words) {
    const anagrams = words[0].split(' - ');
    const size = anagrams.length;
    const randomIndex = parseInt(Math.random() * size);
    const answers = anagrams.filter((el, index) => index !== randomIndex);
    robot.brain.set('anagramGameWord', anagrams[randomIndex]);
    robot.brain.set('anagramAnswers', answers);
    robot.brain.set('anagramGameStarted', true);
    res.send(`Найди анаграмму для слова *${robot.brain.get('anagramGameWord')}*`);
    res.send("если знаешь, то пиши *ан СЛОВО*");
    return res.send("для вызова статистики пиши *статистика анаграмм*");
  }, 'anagrams');
};


module.exports = function(robot) {
  robot.respond(/анаграмма/i, function(res) {
    robot.brain.set('anagramGameStarted', false);
    if (robot.brain.get('anagramGameStarted')) {
      res.send(`Уже запущена! Найди анаграмму для слова *${robot.brain.get('anagramGameWord')}*`);
      res.send("если знаешь, то пиши *ан СЛОВО*");
      return res.send("для вызова статистики пиши *статистика анаграмм*");
    } else {
      return getNewWord(res, robot);
    }
  });

  robot.hear(/ан ([а-я]+)/i, function(res) {
    if (robot.brain.get('anagramGameStarted')) {
      const answer = res.match[1];

      const foundAnswer = robot.brain.get('anagramAnswers').find(word => {
        return word.toUpperCase().indexOf(answer.toUpperCase()) !== -1;
      });
      if (foundAnswer) {
        const count = parseInt(foundAnswer.match(/\((\d+)/)[1]);
        res.send(`Анаграммы: ${res.message.user.name} получает ${count} очков! :tada:`);
        addToResult(robot, res.message.user.name, count);
        return getNewWord(res, robot);
      } else {
        return res.send("Анаграммы: неправильно!");
      }
    }
  });

  return robot.hear(/статистика анаграмм/i, res =>
    (() => {
      const result1 = [];
      const object = getResults(robot);
      for (let user in object) {
        const result = object[user];
        result1.push(res.send(`*${user}*: ${result}`));
      }
      return result1;
    })()
  );
};

