/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
module.exports = robot=>
  robot.respond(/курс/i, function(res){
    const cheerio = require('cheerio');
    return robot.http("http://www.cbr.ru/scripts/XML_daily.asp")
    .get()(function(err, httpres, body) {
      const $ = cheerio.load(body);
      const selector = '[ID="R01035"], [ID="R01090"],[ID="R01235"],[ID="R01239"],[ID="R01760"],[ID="R01375"]';
      const text = $(selector).map((i, el) => {
        return `*${$(el).find('Nominal').text()} ${$(el).find('CharCode').text()}*: ${$(el).find('Value').text()}`;
      }).get().join('\n');
      return res.send(`>>>${text}`);
    });
  })
;
