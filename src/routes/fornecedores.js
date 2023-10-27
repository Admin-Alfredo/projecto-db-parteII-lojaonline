const express = require('express')
const { v4: uuidv4 } = require('uuid');
const { parserEndereco } = require('../util')

module.exports = (app, con) => {
  const routerFornecedores = express.Router()

  routerFornecedores.get('/', (req, res) => {
    return res.render('home', { title: "Administrador" })
  })

  routerFornecedores.get('/fornecedores', async (req, res) => {
    const fornecedores = (await con.query("SELECT * FROM fornecedor")).rows;
    try {
      const produtos = (await con.query("SELECT * FROM produto")).rows;
      const armazens = (await con.query("SELECT * FROM armazen")).rows;

      const contratos = (await con.query(`
        SELECT "contrato".*, "fornecedor"."nome" AS "nome_fornecedor", "produto"."nome" AS "nome_produto", "armazen"."nome" AS "nome_armazen"
        FROM "contrato"
        JOIN "fornecedor" ON "contrato"."fornecedorid" = "fornecedor"."id"
        JOIN "produto" ON "contrato"."produtoid" = "produto"."id"
        JOIN "armazen" ON "contrato"."armazenid" = "armazen"."id";
    `)).rows;
      console.log("CONTRATOS ", contratos);

      return res.render('fornecedores', { title: "DASHBOARD / FORNECEDORES", fornecedores, produtos, armazens, contratos })

    } catch (error) {
      console.log(error.message)
      return res.render('fornecedores', { title: "DASHBOARD / ERRO", fornecedores })
    }
  })


  routerFornecedores.post('/fornecedores', async (req, res) => {

    req.query.f = Boolean(req.query.f)
    let endereco;
    let fornecedorID;
    if (!req.query.f)
      endereco = parserEndereco(req.body.endereco)

    const fornecedores = (await con.query("SELECT * FROM fornecedor")).rows;
    try {
      if (!req.query.f) {

        const enderecoID = uuidv4()
        await con.query(`
        INSERT INTO endereco (id, pais, provincia, municipio, bairro, rua, numerocasa)
        values ('${enderecoID}', '${endereco.pais}', '${endereco.provincia}', '${endereco.municipio}', '${endereco.bairro}', '${endereco.rua}', '${endereco.numeroCasa}')`)

        fornecedorID = uuidv4()

        if (!req.query.f) {
          await con.query(`
          INSERT INTO fornecedor (id, nome, NIF, enderecoid)
          values ('${fornecedorID}', '${req.body.nome}', '${req.body.NIF}', '${enderecoID}')`)
        }
      }

      await con.query(`
      INSERT INTO contrato (id, descricao,  data, fornecedorid, produtoid, armazenid)
      values (DEFAULT, '${req.body.c_descricao}', DEFAULT, '${req.query.f ? req.body.c_fornecedor : fornecedorID}', '${req.body.c_produto}', '${req.body.c_armazen}')`)


      return res.redirect('/admin/fornecedores');

    } catch (error) {
      console.log(error.message)
      return res.render('fornecedores', { title: "DASHBOARD / ERRO", fornecedores })
    }
  })
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