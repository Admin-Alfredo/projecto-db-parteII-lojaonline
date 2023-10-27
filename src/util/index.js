module.exports.parserEndereco = function (endereco) {
  return endereco.split(',').reduce((accumulator, currentValue, index) => {
    switch (index) {
      case 0:
        accumulator.pais = currentValue.trim();
        break;
      case 1:
        accumulator.provincia = currentValue.trim();
        break;
      case 2:
        accumulator.municipio = currentValue.trim();
        break;
      case 3:
        accumulator.bairro = currentValue.trim();
        break;
      case 4:
        accumulator.rua = currentValue.trim();
        break;
      case 5:
        accumulator.numeroCasa = currentValue.trim();
        break;
    }
    return accumulator;
  }, {});
}