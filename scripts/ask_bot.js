const randomWord = require('./lib/random_word');

module.exports = function(robot) {
  robot.respond(/скажи(,)? (.+)\?/i, async res => {
    let noun = await randomWord(res, 'noun');
    let verb = await randomWord(res, 'verb');
    let adjective = await randomWord(res, 'adjective');
    return res.send(`${res.random(res.match[2].split(' '))} ${verb} ${adjective} ${noun}`);
  });

  robot.respond(/сколько (.+)\?/i, async res => {
    let number = (Math.random() * 2) > 1 ?
      res.random('двадцать тридцать сорок пятьдесят шестьдесят семьдесят восемдесят девяносто сто'.split(' ')) : undefined;

    if (number) {
      number += ` ${res.random('один два три четыре пять шесть семь восемь девять'.split(' '))}`;
    } else {
      number = res.random('десять одиннадцать двенадцать триндцать четырнадцать пятнадцать шестнадцать семнадцать восемнадцать девятнадцать'.split(' '));
    }
    let noun = await randomWord(res, 'noun');
    return res.send(`${number} ${noun}`);
  });

  robot.respond(/где (.+)\?/i, async res => {
    let noun = await randomWord(res, 'noun');
    return res.send(`в ${noun}`);
  });

  robot.respond(/как(ая|ой) (.+)\?/i, async res => {
    let word = await randomWord(res, 'adjective');
    const itIs = res.match[1] === 'ой' ? 'он такой... ' : 'она такая...';
    return res.send(`${itIs} ${word}`);
  });

  robot.respond(/с кем (.+)\?/i, async res => {
    let word = await randomWord(res, 'adjective');
    return res.send(`с ${word}`);
  });

  robot.respond(/почему (.+)\?/i, async res => {
    let word = await randomWord(res, 'verb');
    return res.send(`потому что ${word}`);
  });

  robot.respond(/зачем (.+)\?/i, async res => {
    let noun = await randomWord(res, 'noun');
    let verb = await randomWord(res, 'verb');
    return res.send(`чтобы ${noun} не ${verb}`);
  });

  robot.respond(/кто (.+)\?/i, async res => {
    return res.send(await randomWord(res, 'noun'));
  });

  robot.respond(/что (.+)\?/i, async res => {
    return res.send(`${await randomWord(res, 'adjective')} ${await randomWord(res, 'noun')}`);
  });

  robot.respond(/кому (.+)\?/i, async res => {
    return res.send(await randomWord(res, 'noun'));
  });
};

