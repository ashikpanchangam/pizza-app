const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('./config/DB');

const db = mongoose.connection;

mongoose.Promise = global.Promise;

mongoose.connect(config.DB)
    .then(() => {
            console.log('Database is connected')
        },
        err => { console.log('Can not connect to the database' + err) }
    );

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());

app.use(session({
    secret: 'pizza app',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

itemRoutes = require('./expressRoutes/itemRoutes');

app.use('/items', itemRoutes);

const port = process.env.PORT || 4000;

const server = app.listen(port, function() {
    console.log('Listening on port ' + port);
});