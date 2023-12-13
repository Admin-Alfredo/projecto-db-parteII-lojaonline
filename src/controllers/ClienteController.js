const { parserEndereco } = require("../util");

module.exports = (app) => {
  const ClienteControllers = {};
  const { ClienteRepository, EnderecoRepository } = app.repositories;

  ClienteControllers.getAll = async (req, res) => {
    try {
      const clientes = await ClienteRepository.getAll();
      return res.render('clientes', { title: "CLIENTES", clientes })
    } catch (error) {
      console.error("[ERRO]: ", error.message)
      return res.redirect('/admin/clientes')
    }
  }

  ClienteControllers.create = async (req, res) => {
    try {
      const enderecoBody = parserEndereco(req.body.endereco)
      const endereco = await EnderecoRepository.create(enderecoBody)
      req.body.enderecoId = endereco.id;

      const cliente = await ClienteRepository.create(req.body);
      return res.redirect('/clientes/cadastrar')
    } catch (error) {
      console.error("[ERRO]: ", error.message)
      return res.redirect('/clientes/cadastrar?erro')
    }
  }
  ClienteControllers.delete = async (req, res) => {
    try {
      await con.query(`DELETE FROM cliente WHERE id = ${req.params.id}`)
      return res.redirect('/clientes');
    } catch (error) {
      console.error("[ERRO]: ", error.message)
      return res.redirect('/admin/clientes')
    }
  }
  ClienteControllers.getOne = async (req, res) => {

  }
  ClienteControllers.authenticate = async (req, res) => {
    const isSignup = typeof req.query.signup == 'string' ? true : false;

    return res.render('public/authenticate', { title: "CADASTRAR", isSignup})
  }
  ClienteControllers.signin = (req, res) => {
    return res.render('public/signup', { title: "CADASTRAR" })
  }
  return ClienteControllers;
}