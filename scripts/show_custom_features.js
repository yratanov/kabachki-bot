/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
module.exports = robot =>
  robot.respond(/что умеешь?/i, res =>
    res.send(`
      *курс*
      *погода[ Москва]*
      
      *[быть] или [не быть]* - Сомневаешься? Спроси бота!
      *скажи, [вопрос]?* -
      *почему [вопрос]?* -
      *сколько [вопрос]?* -
      *с кем [вопрос]?* -
      *где [вопрос]?* -
      *кому [вопрос]?* -
      *что [вопрос]?* -
      *кто [вопрос]?* -
      *зачем [вопрос]?* -
      *где? [вопрос]?* -
      *когда? [вопрос]?* -
      *как(ая|ой) [вопрос]?* -
      
      *начать угадайку* - Обхитри меня!
      *начать виселицу* - Старая добрая
      *анаграммa* - Игра
      *coub [запрос]* - Смешные видюшки\
      `
    )
  );
