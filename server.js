/**
 * This file is simply for hosting the static game on a server / cloud service.
 */
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use('/', express.static(path.join(__dirname, 'public')));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));