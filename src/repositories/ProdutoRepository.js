const axios = require('axios');

module.exports = (app, con) => {

  const ProdutoRepositories = {};
  const { BASE_URL, ADMIN_ID } = app.services.api.config;
  const options = { baseURL: BASE_URL };

  ProdutoRepositories.getAll = async () => {
    const response = await axios.get(`/produtos?admin=${ADMIN_ID}`, options)
    return response.data.data;
  }
  ProdutoRepositories.create = async (data = {}) => {
    const response = await axios.post('/produtos', data, options)
    await con.query(`INSERT INTO produto (id) values ('${response.data.data._id}')`);
    return { id: response.data.data._id };
  }
  ProdutoRepositories.getOne = async (id) => {
    const response = await axios.get(`/produtos/${id}`, options)
    return response.data.data;
  }
  ProdutoRepositories.update = async (id, data = {}) => {
    const response = await axios.put(`/produtos/${id}`, data, options)
    return true;
  }
  ProdutoRepositories.delete = async (id) => {
    const response = await axios.delete(`/produtos/${id}`, options)
    if (response.status == 200) {
      await con.query(`DELETE from produto where id='${id}'`)
      return true;
    } else return false;
  }
  return ProdutoRepositories;
}