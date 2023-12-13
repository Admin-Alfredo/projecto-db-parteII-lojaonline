module.exports = (app) => {
  const ProdutoControllers = {};
  const { ProdutoRepository } = app.repositories;

  ProdutoControllers.getAll = async (req, res) => {
    try {
      const produtos = await ProdutoRepository.getAll()
      return res.render('produtos', { title: "PRODUTOS", produtos })
    } catch (error) {
      console.error("[ERRO]: ", error.message)
      return res.redirect('/admin/')
    }
  }

  ProdutoControllers.create = async (req, res) => {
    const { ADMIN_ID } = app.services.api.config
    req.body.admin = ADMIN_ID;
    
    try {
      ProdutoRepository.create(req.body)
      return res.redirect('/admin/produtos');
    } catch (error) {
      console.error("[ERRO]: ", error.message)
      return res.redirect('/admin/')
    }
  }
  ProdutoControllers.delete = async (req, res) => {
    try {
      ProdutoRepository.delete(req.params.id)
      return res.redirect('/admin/produtos');
    } catch (error) {
      console.error("[ERRO]: ", error.message)
      return res.redirect('/admin/')
    }
  }
  ProdutoControllers.update = async (req, res) => {
    try {
      ProdutoRepository.update(req.params.id, req.body)
      return res.redirect('/admin/produtos');
    } catch (error) {
      console.error("[ERRO]: ", error.message)
      return res.redirect('/admin/')
    }
  }
  
  return ProdutoControllers;
}