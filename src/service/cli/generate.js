'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {
  getRandomInt,
  getShuffledArray,
  readFile,
} = require(`../../utils`);
const {
  ExitCode,
  MILLISECONDS_IN_MONTH,
} = require(`../../constants`);


const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;
const FILE_TITLES_NAME = `./data/titles.txt`;
const FILE_SENTENCES_NAME = `./data/sentences.txt`;
const FILE_CATEGORIES_NAME = `./data/categories.txt`;


const _generatePost = (titles, sentences, categories) => {
  const title = titles[getRandomInt(0, titles.length - 1)];
  const createDate = new Date(getRandomInt(
      Date.now() - MILLISECONDS_IN_MONTH * 3,
      Date.now()
  ));

  const fullTextSentences = getShuffledArray(sentences)
    .slice(0, getRandomInt(5, sentences.length));

  const announce = fullTextSentences.slice(0, 5).join(` `);
  const fullText = fullTextSentences.join(` `);
  const category = getShuffledArray(categories)
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
  async run(args) {
    const [count] = args;
    const postsCount = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (postsCount > MAX_COUNT || postsCount < DEFAULT_COUNT) {
      console.error(chalk.red(`Генерируется не менее 1, но не более 1000 публикаций.`));
      process.exit(ExitCode.ERROR);
    }

    const [
      titles,
      sentences,
      categories,
    ] = await Promise.all([
      readFile(FILE_TITLES_NAME),
      readFile(FILE_SENTENCES_NAME),
      readFile(FILE_CATEGORIES_NAME),
    ]);

    const posts = Array(postsCount)
      .fill({})
      .map(() => _generatePost(
          titles,
          sentences,
          categories
      ));
    const content = JSON.stringify(posts);

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Файл с моковыми данными успешно создан!`));
    } catch (err) {
      console.error(chalk.red(`Невозможно записать данные в файл!`));
    }
  },
};
