const { v4 } = require("uuid");

module.exports = (app, con) => {

  const ClienteRepositories = {};

  ClienteRepositories.getAll = async () => {
    return (await con.query("SELECT * FROM cliente")).rows
  }
  ClienteRepositories.create = async (data = {}) => {
    const id = v4();
    await con.query(`
      INSERT INTO cliente (id, nome, email, telefone, enderecoid) 
      values ('${id}', '${data.nome}', '${data.email}', '${data.telefone}', '${data.enderecoId}')`);
    return { id };
  }
  ClienteRepositories.getOne = async (id) => {
    const response = await axios.get(`/produtos/${id}`, options)
    return response.data.data;
  }
  ClienteRepositories.update = async (id, data = {}) => {
    const response = await axios.put(`/produtos/${id}`, data, options)
    return true;
  }
  ClienteRepositories.delete = async (id) => {
    const response = await axios.delete(`/produtos/${id}`, options)
    if (response.status == 200) {
      await con.query(`DELETE from produto where id='${id}'`)
      return true;
    } else return false;
  }
  return ClienteRepositories;
}