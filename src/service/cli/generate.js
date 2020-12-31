'use strict';


const chalk = require(`chalk`);
const fs = require(`fs`);
const {
  getRandomInt,
  getShuffledArray,
} = require(`../../utils`);
const {
  MILLISECONDS_IN_MONTH, ExitCode,
} = require(`../../constants`);


const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`,
];

const SENTENCES = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`,
];


const _generatePost = () => {
  const title = TITLES[getRandomInt(0, TITLES.length - 1)];
  const createDate = new Date(getRandomInt(
      Date.now() - MILLISECONDS_IN_MONTH * 3,
      Date.now()
  ));

  const fullTextSentences = getShuffledArray(SENTENCES)
    .slice(0, getRandomInt(5, SENTENCES.length));

  const announce = fullTextSentences.slice(0, 5).join(` `);
  const fullText = fullTextSentences.join(` `);
  const category = getShuffledArray(CATEGORIES)
    .slice(0, getRandomInt(1, 3));

  return {
    title,
    createDate,
    announce,
    fullText,
    category,
  };
};


module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const postsCount = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (postsCount > MAX_COUNT || postsCount < DEFAULT_COUNT) {
      console.error(chalk.red(`Генерируется не менее 1, но не более 1000 публикаций.`));
      process.exit(ExitCode.ERROR);
    }

    const posts = Array(postsCount)
      .fill({})
      .map(_generatePost);
    const content = JSON.stringify(posts);

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        console.error(chalk.red(`Невозможно записать данные в файл!`));
      }

      console.info(chalk.green(`Файл с моковыми данными успешно создан!`));
    });
  },
};
