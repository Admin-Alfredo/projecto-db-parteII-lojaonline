module.exports = (app, con) => {
  app.get('/', async (req, res) => {
    try {
      const produtos = (await con.query("SELECT * FROM produto")).rows;
      console.log(produtos)
      return res.render('home', { title: "DASHBOARD / PRODUTOS", produtos })
    } catch (error) {
      console.log(error.message)
      return res.render('home', { title: "HOME / ERRO" })
    }

  })
}