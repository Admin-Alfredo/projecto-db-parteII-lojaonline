const { v4: uuidv4 } = require('uuid')
const express = require('express')
module.exports = (app, con) => {
  const routerProdutos = express.Router()
  const { ProdutoController } = app.controllers;
  const { Middleware: { parseDataForUse } } = app.middlewares

  routerProdutos.get('/produtos', ProdutoController.getAll);
  routerProdutos.post('/produtos/create', parseDataForUse, ProdutoController.create);
  routerProdutos.get('/produtos/delete/:id', ProdutoController.delete)
  routerProdutos.get('/produtos/update/:id', ProdutoController.update)


  app.use('/admin', routerProdutos)
}