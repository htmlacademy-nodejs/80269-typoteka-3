'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const http = require(`http`);
const HttpCode = require(`../../constants`).HttpCode;


const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;
const NOT_FOUND_MESSAGE = `Not found`;


module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    const sendResponse = (res, statusCode, message) => {
      const template = `
        <!Doctype html>
          <html lang="ru">
          <head>
            <title>With love from Node</title>
          </head>
          <body>${message}</body>
        </html>`.trim();

      res.statusCode = statusCode;
      res.writeHead(statusCode, {
        'Content-Type': `text/html; charset=UTF-8`,
      });
      res.end(template);
    };

    const onClientConnect = async (req, res) => {
      switch (req.url) {
        case `/`:
          try {
            const fileContent = await fs.readFile(FILENAME);
            const mocks = JSON.parse(fileContent);
            const message = mocks
              .map((post) => `<li>${post.title}</li>`)
              .join(``);

            sendResponse(res, HttpCode.OK, `<ul>${message}</ul>`);
          } catch (err) {
            sendResponse(res, HttpCode.NOT_FOUND, NOT_FOUND_MESSAGE);
          }

          break;
        default:
          sendResponse(res, HttpCode.NOT_FOUND, NOT_FOUND_MESSAGE);
          break;
      }
    };

    http.createServer(onClientConnect)
      .listen(port)
      .on(`listening`, (err) => {
        if (err) {
          console.error(chalk.red(`Ошибка при создании сервера: ${err}`));
        }

        return console.info(chalk.green(`Ожидаю соединений на порт #${port}`));
      });
  }
};
