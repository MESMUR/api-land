import './module-alias';

import express from 'express';
import { RootController } from 'src/controllers';
import { PORT } from 'src/config/app-config';

// gracefulShutdown(server, {
//   preShutdown: async () => {
//     logger.info('Attempting to gracefully shutdown');
//   },
//   finally: () => {
//     logger.info('Server shutdown gracefully');
//   }
// });

(async () => {
    const app = express();
    const rootController = new RootController();

    app.listen(PORT, () => {
        console.log(`Server started on Port: ${PORT}`);
    });

    app.use('/', rootController.getRouter());
})();
