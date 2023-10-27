const { v4: uuidv4 } = require('uuid')
const express = require('express')
module.exports = (app, con) => {
  const routerProdutos = express.Router()

  // routerProdutos.get('/', (req, res) => {
  //   return res.render('home', { title: "Administrador" })
  // })

  routerProdutos.get('/produtos', async (req, res) => {
    const produtos = (await con.query("SELECT * FROM produto")).rows;
    console.log(produtos)
    return res.render('produtos', {
      title: "DASHBOARD / PRODUTOS", produtos
    })
  })


  routerProdutos.post('/produtos', async (req, res) => {
    req.body.preco = parseFloat(req.body.preco);
    req.body.quantidade = parseInt(req.body.quantidade)
    console.log("CADASTRANDO PRODUTO ")
    const produtos = []
    try {
      const produtoID = uuidv4()
      await con.query(`INSERT INTO produto values ('${produtoID}', '${req.body.nome}', ${req.body.preco}, ${req.body.quantidade})`)
      return res.redirect('/admin/produtos');
      // return res.render('produtos', { title: "DASHBOARD / PRODUTO", produtos });
    } catch (error) {
      console.log(error.message)
      return res.render('produtos', {  title: "DASHBOARD / PRODUTO", produtos });
    }
  })
  // deletar um produto
  routerProdutos.get('/produtos/:id/delete', async (req, res) => {
    const produtos = (await con.query("SELECT * FROM produto")).rows;

    try {
      await con.query(`DELETE FROM produto WHERE id = '${req.params.id}'`)
      return res.redirect('/admin/produtos');
    } catch (error) {
      return res.render('produtos', { error: error.message, produtos });
    }
  })
  app.use('/admin', routerProdutos)
}