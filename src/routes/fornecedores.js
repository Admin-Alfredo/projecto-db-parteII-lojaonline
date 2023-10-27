const express = require('express')
module.exports = (app, con) => {
  const routerFornecedores = express.Router()

  routerFornecedores.get('/', (req, res) => {
    return res.render('home', { title: "Administrador" })
  })

  routerFornecedores.get('/fornecedores', async (req, res) => {
    const fornecedores = (await con.query("SELECT * FROM fornecedor")).rows;
    const produtos = (await con.query("SELECT * FROM produto")).rows;
    const armazens = (await con.query("SELECT * FROM armazen")).rows;
    return res.render('fornecedores', {
      title: "DASHBOARD / PRODUTOS",
      fornecedores,
      produtos,
      armazens
    })
  })


  // routerFornecedores.post('/produtos', async (req, res) => {
  //   req.body.preco = parseFloat(req.body.preco);
  //   req.body.quantidade = parseInt(req.body.quantidade)

  //   const produtos = (await con.query("SELECT * FROM produto")).rows;
  //   try {
  //     await con.query(`INSERT INTO produto values (default, '${req.body.nome}', ${req.body.preco}, ${req.body.quantidade})`)
  //     return res.redirect('/admin/produtos');

  //   } catch (error) {
  //     console.log(error.message)
  //     return res.render('produtos', { error: error.message, produtos });
  //   }
  // })
  // // deletar um produto
  // routerFornecedores.get('/produtos/:id/delete', async (req, res) => {
  //   const produtos = (await con.query("SELECT * FROM produto")).rows;

  //   try {
  //     await con.query(`DELETE FROM produto WHERE id = ${req.params.id}`)
  //     return res.redirect('/admin/produtos');
  //   } catch (error) {
  //     return res.render('produtos', { error: error.message, produtos });
  //   }
  // })
  app.use('/admin', routerFornecedores)
}