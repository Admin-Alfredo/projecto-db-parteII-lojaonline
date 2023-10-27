const { Connection } = require("pg");
const express = require('express')
const { v4: uuidv4 } = require('uuid');
const { parserEndereco } = require("../util");

module.exports = (app, con) => {
  const routerProdutos = express.Router()

  routerProdutos.get('/armazens', async (req, res) => {
    try {
      const armazens = (await con.query(`
        SELECT "armazen".*, "endereco"."provincia", "endereco"."municipio"
        FROM "armazen"
        JOIN "endereco" ON "armazen"."enderecoid" = "endereco"."id";
      `)).rows;
      console.log("RESULTADO ---> ", armazens)
      return res.render('armazens', { title: "DASHBOARD / ARMAZEN", armazens })

    } catch (error) {
      console.log("ERROR ", error.message)
      return res.render('armazens', { title: "DASHBOARD / ERRO", armazens: [] })
    }
  })


  routerProdutos.post('/armazens', async (req, res) => {
    const endereco = parserEndereco(req.body.endereco)

    try {
      const enderecoID = uuidv4()
      const result = await con.query(`
      INSERT INTO endereco (id, pais, provincia, municipio, bairro, rua, numerocasa)
      values ('${enderecoID}', '${endereco.pais}', '${endereco.provincia}', '${endereco.municipio}', '${endereco.bairro}', '${endereco.rua}', '${endereco.numeroCasa}')`)

      console.log("ENDERECO ", result)
      await con.query(`INSERT INTO armazen(id, nome, capacidadearmazenamento, enderecoid) values (default, '${req.body.nome}', ${req.body.capacidadearmazenamento}, '${enderecoID}')`)
      return res.redirect('/admin/armazens');

    } catch (error) {
      console.log(error.message)
      return res.render('armazens', { title: "DASHBOARD / ERRO - " + error.message });
    }
  })
  // deletar um produto
  routerProdutos.get('/armazens/:id/delete', async (req, res) => {
    const produtos = (await con.query("SELECT * FROM armazen")).rows;

    try {
      await con.query(`DELETE FROM armazen WHERE id = ${req.params.id}`)
      return res.redirect('/admin/armazens');
    } catch (error) {
      return res.render('produtos', { title: "DASHBOARD / ERRO - " + error.message, produtos });
    }
  })
  app.use('/admin', routerProdutos)
}