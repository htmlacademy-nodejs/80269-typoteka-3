'use strict';


module.exports = {
  DEFAULT_COMMAND: `--help`,
  ExitCode: {
    ERROR: 1,
    SUCCESS: 0,
  },
  HttpCode: {
    OK: 200,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401,
  },
  MILLISECONDS_IN_MONTH: 1000 * 60 * 60 * 24 * 30,
  USER_ARGV_INDEX: 2,
};
