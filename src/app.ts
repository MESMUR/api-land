import './module-alias';

import express from 'express';
import gracefulShutdown from 'http-graceful-shutdown';

import { RootController } from 'src/controllers';
import { PORT } from 'src/config/app-config';
import { infoLogger as logger, expressLogger } from 'src/libs/logger';

const preShutdownFunc = async () => {
    logger.info('Attempting to gracefully shutdown');
};

const finallyShutdownFunc = () => {
    logger.info('Server shutdown gracefully');
};

(async () => {
    const app = express();
    const rootController = new RootController();
    app.use(expressLogger);
    app.use('/', rootController.getRouter());

    const server = app.listen(PORT, () => {
        logger.info(`Server started on Port: ${PORT}`);
    });

    gracefulShutdown(server, {
        preShutdown: preShutdownFunc,
        finally: finallyShutdownFunc
    });
})();
