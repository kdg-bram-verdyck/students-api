const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000
const config = require('./config');

app.use(cors());
app.use(express.static('public'));

const routes = require("./routes/routes.js")(app);

const server = app.listen(config.PORT, function () {
    console.log('Listening on port %s...', server.address().port);
});