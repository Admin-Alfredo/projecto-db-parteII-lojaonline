const consign = require('consign');
const path = require('path');
const express = require('express');
const database = require('./services/database');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('../../api-produtos/node_modules/morgan/index')
const PORT = 8000;
const app = express();
app.engine('handlebars', engine({ defaultLayout: 'public-layout' }));

// app.use(morgan('dev'))
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  if (req.url.startsWith('/admin/')) {
    res.locals.layout = 'admin-layout';
  } else {
    res.locals.layout = 'public-layout';
  }
  next();
});

database().then(connction => {
  consign({ cwd: path.join(process.cwd(), '/src'), })
    .exclude('services/database.js')
    .include('/services/api.js')
    .then('models')
    .then('repositories')
    .then('middlewares')
    .then('controllers')
    .then('routes')
    .into(app, connction)

  
  app.listen(PORT, () => console.log(`RUNNING IN http://localhost:${PORT}`));
  console.log("connection database successfuly!")
}).catch(err => {
  console.error("A conecção com postgres falhou! ", err);
  console.log("Finalizando o processo " + process.pid);
  process.exit()
})
