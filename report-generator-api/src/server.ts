import express from 'express';
import { createGeneratedFolders } from './helper/utils';
import reportRoute from './route/reportRoute';

const app = express();
app.all('*', function (_req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

createGeneratedFolders();

const port = process.env['PORT'] ?? 3001;
app.use('/api', reportRoute);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
