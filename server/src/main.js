import 'core-js/stable';
import 'regenerator-runtime/runtime';
import startExpressApp from './api';
import { connectDb } from './repository/base-repository';

// eslint-disable-next-line no-shadow
(async (startApi, connectDb) => {
    await connectDb();
    await startApi();
})(startExpressApp, connectDb);
