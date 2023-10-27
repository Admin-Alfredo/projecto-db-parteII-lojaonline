const { Connection } = require("pg");
const express = require('express')
module.exports = (app, con) => {
  const routerAdmin = express.Router()

  routerAdmin.get('/', (req, res) => {
    return res.render('home', { title: "Administrador" })
  })

  routerAdmin.get('/produtos', async (req, res) => {
    const produtos = (await con.query("SELECT * FROM produto")).rows;
    console.log(produtos)
    return res.render('produtos', {
      title: "DASHBOARD / PRODUTOS", produtos
    })
  })


  routerAdmin.post('/produtos', async (req, res) => {
    req.body.preco = parseFloat(req.body.preco);
    req.body.quantidade = parseInt(req.body.quantidade)

    const produtos = (await con.query("SELECT * FROM produto")).rows;
    try {
      await con.query(`INSERT INTO produto values (default, '${req.body.nome}', ${req.body.preco}, ${req.body.quantidade})`)
      return res.redirect('/admin/produtos');

    } catch (error) {
      console.log(error.message)
      return res.render('produtos', { error: error.message, produtos });
    }
  })
  // deletar um produto
  routerAdmin.get('/produtos/:id/delete', async (req, res) => {
    const produtos = (await con.query("SELECT * FROM produto")).rows;

    try {
      await con.query(`DELETE FROM produto WHERE id = ${req.params.id}`)
      return res.redirect('/admin/produtos');
    } catch (error) {
      return res.render('produtos', { error: error.message, produtos });
    }
  })
  app.use('/admin', routerAdmin)
}