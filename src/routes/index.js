const { Connection } = require("pg");

module.exports = (app, con) => {

  app.post('/produtos', async (req, res) => {
    req.body.preco = parseFloat(req.body.preco);
    req.body.quantidade = parseInt(req.body.quantidade)
    
    console.log("PRODUTO BODY: ", req.body)
    try {
      await con.query(`INSERT INTO produto values (default, '${req.body.nome}', ${req.body.preco}, ${req.body.quantidade})`)
      return res.render('produtos', { error: null });

    } catch (error) {
      console.log(error.message)
      return res.render('produtos', { error: error.message });
    }
  })
}