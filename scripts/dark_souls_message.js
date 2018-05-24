const fs = require('fs');

const TEMPLATES = [
  'впереди ****',
  'впереди отсутствует ****',
  'впереди требуется ****',
  'осторожно: ****',
  'может помочь ****',
  'может быть, это ****?',
  'будь у меня ****...',
  'видение - ****...',
  'время пришло - ****',
  '****',
  '****!',
  '****?',
  '****...',
  'ха, это ****...',
  'слава, ****!',
  'да будет ****',
  'ах, ****...'
];

const CONJUNCTIONS = [
  '',
  'и тогда',
  'но',
  'так что',
  'короче',
  'или',
  'только',
  'кстати',
  'так сказать',
  'тем более',
  ','
];

const CATEGORIES = [
  [
    'враг',
    'монстр',
    'группа врагов',
    'сильный враг',
    'опасный враг',
    'опустошенный',
    'пилигрим',
    'заключенный',
    'чудовище',
    'скелет',
    'призрак',
    'зверь',
    'ящерица',
    'жук',
    'личинка',
    'краб',
    'карлик',
    'гигант',
    'демон',
    'дракон',
    'рыцарь',
    'наемник',
    'воин',
    'глашатай',
    'бандит',
    'убийца',
    'чародей',
    'пиромант',
    'клирик',
    'нищик',
    'стрелок',
    'двое',
    'трое',
    'ты',
    'ты, гад',
    'ваше благородие',
    'святой',
    'обезображенный',
    'чародей',
    'несчастная душа',
    'чудоак',
    'ловкач',
    'увалень',
    'богач',
    'нищий',
    'еретик',
    'лжец',
    'толстяк',
    'верзила',
    'юноша',
    'старец',
    'старый чудак',
    'старуха',
    'торговец',
    'ремесленник',
    'мастер',
    'мудрец',
    'чемпион',
    'повелитель пепла',
    'король',
    'королева',
    'принц',
    'принцесса',
    'ангел',
    'бог',
    'друг',
    'союзник',
    'супруг',
    'участник ковенанта',
    'фантом',
    'Толян',
    'Алексей',
    'темный дух'
  ],
  [
    'костер',
    'уголь',
    'стена тумана',
    'рычаг',
    'устройство',
    'ключ',
    'ловушка',
    'факел',
    'дверь',
    'клад',
    'сундук',
    'нечто',
    'нечто потрясающее',
    'мусор',
    'грязь',
    'оружие',
    'щит',
    'снаряд',
    'доспехи',
    'предмет',
    'кольцо',
    'руда',
    'уголь',
    'транспозиционная печь',
    'свиток',
    'чей-то пепел',
    'трон',
    'ритуал',
    'гроб',
    'зола',
    'пепел',
    'луна',
    'зрачок',
    'спиртное',
    'суп',
    'послание',
    'кровавое пятно',
    'иллюзия'
  ],
  [
    'ближний бой',
    'дальний бой',
    'уничтожать по одному',
    'выманить',
    'жестокое избиение',
    'атаковать из засады',
    'хажать в клещи',
    'атаковать всех с налета',
    'оружие в каждой руке',
    'скрытность',
    'мимикрия',
    'бегство',
    'броситься в атаку',
    'спрыгнуть',
    'прорваться',
    'движение по кругу',
    'заточение',
    'спасение',
    'навык',
    'чары',
    'пиромантия',
    'чудеса',
    'чистая удача',
    'благоразумие',
    'краткая передышка',
    'притвориться мертвым'
  ],
  [
    'толчок',
    'рывок',
    'перекат',
    'отскок',
    'прыжок',
    'атаковать',
    'атаковать в прыжке',
    'атаковать в рывке',
    'контратаковать',
    'удар в спину',
    'оглуш. при защите и удар',
    'удар в падении',
    'сметающая атака',
    'пробить щит',
    'блок',
    'парирование',
    'захватиться цель',
    'без захвата',
    'двуручное',
    'жест',
    'управление',
    'уничтожить'
  ],
  [
    'булыжник',
    'лава',
    'ядовитый газ',
    'орда врагов',
    'лес',
    'болото',
    'пещера',
    'короткий путь',
    'обход',
    'тайная тропа',
    'короткий путь',
    'тупик',
    'лабиринт',
    'дыра',
    'светлое место',
    'темное место',
    'простор',
    'теснина',
    'безопасная зона',
    'опасная зона',
    'позиция для стрельбы',
    'укрытие',
    'призрачная стена',
    'лестница',
    'подъемник',
    'роскошный вид',
    'взгляд в сторону',
    'самоуверенность',
    'промах',
    'упущение',
    'утомление',
    'невезение',
    'невнимательность',
    'потеря выносливости',
    'случайная встреча',
    'ожидаемая встреча'
  ],
  [
    'вперед',
    'назад',
    'влево',
    'вправо',
    'вверх',
    'вниз',
    'внизу',
    'наверху',
    'сзади'
  ],
  [
    'голова',
    'шея',
    'живот',
    'спина',
    'рука',
    'палец',
    'нога',
    'зад',
    'хвост',
    'крылья',
    'все',
    'язык',
    'правая рука',
    'левая рука',
    'большой палец',
    'указательный палец',
    'средний палец',
    'безымянный палец',
    'мезинец',
    'правая нога',
    'левая нога',
    'правая сторона',
    'левая сторона',
    'клешня',
    'колесо',
    'центр',
    'всадник'
  ],
  [
    'обычный удар',
    'дробящий удар',
    'колющий удар',
    'рубящий удар',
    'магия',
    'кристалл',
    'огонь',
    'хаос',
    'молния',
    'благословление',
    'тьма',
    'критические удары',
    'кровотечение',
    'яд',
    'токсин',
    'мороз',
    'проклятие',
    'поломка снаряжения'
  ],
  [
    'шанс',
    'затруднение',
    'совет',
    'секрет',
    'сонный бред',
    'счастье',
    'неудача',
    'жизнь',
    'смерть',
    'погибель',
    'радость',
    'ярость',
    'агония',
    'печаль',
    'слезы',
    'преданность',
    'вероломство',
    'надежда',
    'отчаяние',
    'страх',
    'помешательство',
    'победа',
    'поражение',
    'жертва',
    'свет',
    'тьма',
    'смелость',
    'уверенность',
    'жизненная сила',
    'месть',
    'смирение',
    'ошеломление',
    'сожаление',
    'бесцельность',
    'мужчина',
    'женщина',
    'дружба',
    'любовь',
    'безрассудство',
    'спокойствие',
    'сила духа',
    'удобство',
    'тишина',
    'глубина',
    'отбросы',
  ],
  [
    'удачи',
    'отлично',
    'получилось',
    'не вышло',
    'сюда',
    'не сюда',
    'это невыносимо',
    'одиноко...',
    'не смей',
    'действуй',
    'смотри внимательно',
    'слушай внимательно',
    'подумай хорошенько',
    'снова это место',
    'теперь начнется сражение',
    'ты этого не заслуживаешь',
    'не останавливайся',
    'отступи',
    'сдавайся',
    'не сдавайся',
    'помогите',
    'невозможно',
    'чертовски дорого',
    'выпустите меня отсюда',
    'сохраняй спокойствие',
    'словно во сне',
    'выглядит знакомым...',
    'ты готов',
    'это случится и с тобой',
    'восславь Солнце',
    'да освятит пламя твой путь',
  ]
];

function dsMessage(res) {
  let phrase = res.random(TEMPLATES).replace('****', res.random(res.random(CATEGORIES)));

  if (Math.random() > 0.5) {
    phrase += "\n" + res.random(CONJUNCTIONS) + ' ' + res.random(TEMPLATES).replace('****', res.random(res.random(CATEGORIES)));
  }

  return phrase;
}

const ie = require('image-editor');

function sendPhoto(text, robot, chatId) {
  let tempFileName = '/tmp/ds.png';
  ie.readFile('./images/plague.png')
    .then(buffer => ie.write(buffer, text, 10, -30, 'North'))
    .then(buffer => ie.writeFile(buffer, tempFileName))
    .then(() => {
      robot.emit('telegram:invoke', 'sendPhoto', {
        chat_id: chatId,
        photo: fs.createReadStream(tempFileName)
      }, function(error) {
        console.log(error);
        fs.unlink(tempFileName, console.log)
      });
    }).catch(console.log);
}

module.exports = robot => {
  robot.respond(/(дс|кто|что|кому|почему|зачем)/i, function(res) {
    res.send(dsMessage(res));
  });
  robot.hear(/((в|В)осславь|dark souls|bloodborne|соус)/i, function(res) {
    sendPhoto(dsMessage(res), robot, res.message.room);
  });
};
