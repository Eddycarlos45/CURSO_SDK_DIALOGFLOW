const express  = require("express");
const bodyParser = require("body-parser");
const consign = require('consign');

module.exports = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/public'));

  consign()
        .include('src/routes.js')
        .into(app)

  return app
}

