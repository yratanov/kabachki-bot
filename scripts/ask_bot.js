const randomWord = require('./lib/random_word');

const randomNumerical = (res) => {
  let number = randBool() ?
    res.random('двадцать тридцать сорок пятьдесят шестьдесят семьдесят восемдесят девяносто сто'.split(' ')) : undefined;

  if (number) {
    number += ` ${res.random('один два три четыре пять шесть семь восемь девять'.split(' '))}`;
  } else {
    number = res.random('десять одиннадцать двенадцать триндцать четырнадцать пятнадцать шестнадцать семнадцать восемнадцать девятнадцать'.split(' '));
  }
  return number;
};

const randBool = () => {
  return (Math.random() * 2) > 1;
};

module.exports = function(robot) {
  robot.respond(/скажи(,)? (.+)\?/i, async res => {
    let noun = await randomWord('noun');
    let verb = await randomWord('verb');
    let adjective = await randomWord('adjective');
    return res.send(`${res.random(res.match[2].split(' '))} ${verb} ${adjective} ${noun}`);
  });

  robot.respond(/сколько (.+)\?/i, async res => {
    let noun = await randomWord('noun');
    return res.send(`${randomNumerical(res)} ${noun}`);
  });

  robot.respond(/(где|куда) (.+)\?/i, async res => {
    let noun = await randomWord('noun');
    return res.send(`в ${noun}`);
  });

  robot.respond(/как(ая|ой) (.+)\?/i, async res => {
    let word = await randomWord('adjective');
    const itIs = res.match[1] === 'ой' ? 'он такой... ' : 'она такая...';
    return res.send(`${itIs} ${word}`);
  });

  robot.respond(/с кем (.+)\?/i, async res => {
    let word = await randomWord('adjective');
    return res.send(`с ${word}`);
  });

  robot.respond(/почему (.+)\?/i, async res => {
    let word = await randomWord('verb');
    return res.send(`потому что ${word}`);
  });

  robot.respond(/зачем (.+)\?/i, async res => {
    let noun = await randomWord('noun');
    let verb = await randomWord('verb');
    return res.send(`чтобы ${noun} не ${verb}`);
  });

  robot.respond(/кто (.+)\?/i, async res => {
    return res.send(await randomWord('noun'));
  });

  robot.respond(/что (.+)\?/i, async res => {
    return res.send(`${await randomWord('adjective')} ${await randomWord('noun')}`);
  });

  robot.respond(/кому (.+)\?/i, async res => {
    return res.send(await randomWord('noun'));
  });

  robot.respond(/когда (.+)\?/i, async res => {
    let response = `${randomNumerical(res)} ${res.random(['лет', 'дней', 'часов', 'месяцев'])}`;
    if (res.match[1].match(/(ил|ал|ел)/)) {
      response += ' назад'
    } else {
      response = 'через ' + response;
    }
    res.send(response);
  });
};

