const axios = require('axios');
const { v4 } = require('uuid');

module.exports = (app, con) => {

  const EnderecoRepositories = {};

  EnderecoRepositories.getAll = async () => {
   
  }
  EnderecoRepositories.create = async (data = {}) => {
    const id = v4()
    await con.query(`
      INSERT INTO endereco (
        id,pais,provincia,municipio,bairro,rua,numerocasa)
      values (
        '${id}',
        '${data.pais}',
        '${data.provincia}', 
        '${data.municipio}',
        '${data.bairro}', 
        '${data.rua}', 
        '${data.numeroCasa}'
      )
    `)
    return { id };
  }
  EnderecoRepositories.getOne = async (id) => {
    
  }
  EnderecoRepositories.update = async (id, data = {}) => {
    
  }
  EnderecoRepositories.delete = async (id) => {
    
  }
  return EnderecoRepositories;
}