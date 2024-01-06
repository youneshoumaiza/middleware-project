const express = require('express');
const { setupLogging } = require('./config/logging');
const { ROUTES } = require('./config/routes');
const { setupProxies } = require('./config/proxy');
const { setupRateLimit } = require('./config/ratelimit');

const app = express();
const port = process.env.PORT || 5050;

setupLogging(app);
setupProxies(app, ROUTES);
setupRateLimit(app, ROUTES);

app.listen(port, () => {
    console.log(`API Gateway listening at http://localhost:${port}`)
})