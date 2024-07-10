const { Connection } = require("pg");
const express = require('express')
const { v4: uuidv4 } = require('uuid');
const { parserEndereco } = require("../util");

module.exports = (app, con) => {
  const routerAdminClientes = express.Router()
  const routerClientes = express.Router()
  const { ClienteController } = app.controllers
  console.log("Cliente Controller: ", ClienteController)

  routerAdminClientes.get('/', ClienteController.getAll);
  routerAdminClientes.post('/', ClienteController.create);
  routerAdminClientes.get('/:id/delete', ClienteController.delete)
  routerAdminClientes.get('/:id',  ClienteController.getOne)
  
  routerClientes.get('/:id',  ClienteController.getOne)
  app.get('/authenticate', ClienteController.authenticate)
  
  app.use('/admin/clientes', routerAdminClientes)
  app.use('/clientes', routerClientes)  
}

  // routerProdutos.post('/', async (req, res) => {
  //   try {


  //     const endereco = parserEndereco(req.body.endereco)
  //     req.body.telefone = parseInt(req.body.telefone)
  //     const enderecoID = uuidv4()
  //     const clienteID = uuidv4();
  //     await con.query(`
  //       INSERT INTO endereco (id, pais, provincia, municipio, bairro, rua, numerocasa)
  //       values ('${enderecoID}', '${endereco.pais}', '${endereco.provincia}', '${endereco.municipio}', '${endereco.bairro}', '${endereco.rua}', '${endereco.numeroCasa}')
  //     `)

  //     console.log("+++++++==+++++++++++++++++++++++++++++++++++++++++++++++++++")
  //     await con.query(`
  //       INSERT INTO cliente (id, nome, email, telefone, enderecoid) 
  //       values ('${clienteID}', '${req.body.nome}', '${req.body.email}', ${req.body.telefone},'${enderecoID}')
  //     `)
  //     const cliente = (await con.query(`SELECT * FROM cliente where id = '${clienteID}'`)).rows


  //     res.cookie('lojaonline_cliente', JSON.stringify(cliente), {
  //       maxAge: 3600000, // Tempo de vida do cookie em milissegundos (1 hora)
  //       httpOnly: true, // O cookie só pode ser acessado pelo servidor (não via JavaScript no navegador)
  //       path: '/'
  //     });

  //     console.log("HELLO", req.body, enderecoID)
  //     return res.redirect(`/`)
  //   } catch (error) {
  //     console.log(error.message)
  //     return res.render('home', { title: "DASHBOARD / ERRO - " + error.message, produtos });
  //   }
  // })
