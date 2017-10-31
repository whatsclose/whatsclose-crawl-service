import config from 'config/index';
import winston from 'winston';

const logger = new winston.Logger({
    level: config.LOGGER_LEVEL,
    transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
        new winston.transports.File({
            name: `error-file`,
            filename: `${config.LOGGER_PATH}${config.SERVICE_NAME}_error.log`,
            level: `error`,
        }),
        new winston.transports.File({
            name: `info-file`,
            filename: `${config.LOGGER_PATH}${config.SERVICE_NAME}.log`,
        }),
    ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (config.NODE_ENV !== `production`) {
    logger.add(winston.transports.Console);
}

if (!config.LOGGER_ENABLED) {
    logger.clear();
}

export default logger;
