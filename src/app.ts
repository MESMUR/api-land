import './module-alias';

import express from 'express';
import gracefulShutdown from 'http-graceful-shutdown';

import { RootController } from 'src/controllers';
import { PORT } from 'src/config/app-config';

const preShutdownFunc = async () => {
    console.log('Attempting to gracefully shutdown');
};

const finallyShutdownFunc = () => {
    console.log('Server shutdown gracefully');
};

(async () => {
    const app = express();
    const rootController = new RootController();
    app.use('/', rootController.getRouter());

    const server = app.listen(PORT, () => {
        console.log(`Server started on Port: ${PORT}`);
    });

    gracefulShutdown(server, {
        preShutdown: preShutdownFunc,
        finally: finallyShutdownFunc
    });
})();
