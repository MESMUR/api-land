import { createLogger, format, transports } from 'winston';
import { logger } from 'express-winston';

const { combine, timestamp, label, colorize, printf, splat } = format;

const myFormat = printf(info => {
    return `${info.timestamp} ${info.label} ${info.level}: ${info.message}`;
});

const options = {
    file: {
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false
    },
    console_info: {
        format: combine(colorize(), label({ label: '[api-land]' }), timestamp(), splat(), myFormat)
    },
    console_requests: {
        format: format.combine(format.json(), format.prettyPrint()),
        handleExceptions: true
    }
};

export const infoLogger = createLogger({
    level: 'info',
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new transports.File({ filename: 'logs/error.log', level: 'error', ...options.file }),
        new transports.File({ filename: 'logs/combined.log', ...options.file }),
        new transports.Console(options.console_info)
    ]
});

export const expressLogger = logger({
    level: 'info',
    transports: [
        new transports.File({ filename: 'logs/requests-error.log', level: 'error', ...options.file }),
        new transports.File({ filename: 'logs/requests-combined.log', ...options.file }),
        new transports.Console(options.console_requests)
    ]
});
