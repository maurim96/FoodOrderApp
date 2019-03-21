var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var methodOverride = require('method-override');

const PORT = 3000;

var app = express();
var router = express.Router();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

//models
require('./app/models/menu.js');
require('./app/models/menuType.js');
require('./app/models/ingredients.js');

//routes
app.use(require('./app/routes'));

mongoose.connect('mongodb://localhost:27017/FoodOrder', { useNewUrlParser: true })
  .then((x) => console.log('Connected to mongodb'))
  .catch((err) => console.error(err));

app.use(router);

app.listen(PORT, () => {
  console.log('We are live on ' + PORT);
});