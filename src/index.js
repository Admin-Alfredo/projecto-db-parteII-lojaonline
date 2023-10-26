const consign = require('consign');
const path = require('path');
const express = require('express');
const database = require('./services/database');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  return res.render('home', { title: "DASHBOARD LOJA ONLINE" })
})

app.get('/produtos', (req, res) => {

  return res.render('produtos', { title: "DASHBOARD LOJA ONLINE" })
})



database().then(connction => {

  consign({ cwd: path.join(process.cwd(), '/src') })
    .then('models')
    .then('routes')
    .into(app, connction)
  app.listen(3000, () => console.log(`RUNNING IN PORT 3000`));
}).catch(err => {
  console.error("A conecção com postgres falhou! " + err.message);
  console.log("Finalizando o processo " + process.pid);
  process.exit()
})
