module.exports = (app, con) => {
  const { ProdutoRepository } = app.repositories;
  app.get('/', async (req, res) => {
    try {
      const produtos = await ProdutoRepository.getAll();
      return res.render('home', { title: "LOJAONLINE", produtos })
    } catch (error) {
      console.error("[ERRO]: ", error.message)
      return res.redirect('/')
    }

  })
}