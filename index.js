var express =  require('express');
var cors = require('cors');

const addon = require('./build/Release/addon');

var bodyParser = require('body-parser');

var exec = require("child_process").exec;
const app = express();

var runAddon = (x1, x2, x3, x4) => addon.flpenum(x1, x2, x3, x4);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.send('Hello World!')
});

app.get('/users', function(req, res) {
  // Hard coding for simplicity. Pretend this hits a real database
  res.json([
    {"id": 1,"firstName":"Juozas","lastName":"Venskutonis","email":"juozas.venskutonis@vvk.lt"},
    {"id": 2,"firstName":"Juozas","lastName":"Venskutonis","email":"juozas.venskutonis@vvk.lt"},
    {"id": 3,"firstName":"Juozas","lastName":"Venskutonis","email":"juozas.venskutonis@vvk.lt"},
    {"id": 4,"firstName":"Juozas","lastName":"Venskutonis","email":"juozas.venskutonis@vvk.lt"},
    {"id": 5,"firstName":"Juozas","lastName":"Venskutonis","email":"juozas.venskutonis@vvk.lt"},
    {"id": 6,"firstName":"Juozas","lastName":"Venskutonis","email":"juozas.venskutonis@vvk.lt"}
  ]);
});

app.use('/data', function(req, res){
  console.log(req.query);
  var a = req.query.viet_sk;
  var b = req.query.e_obj_sk;
  var c = req.query.k_obj_sk;
  var d = req.query.n_obj_sk;
  var result = runAddon(a, b, c, d);
  console.log(result);
  res.send(result);
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port')); 
});