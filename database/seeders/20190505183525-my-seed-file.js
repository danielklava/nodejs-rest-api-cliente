'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    queryInterface.bulkInsert('CondicaoPagamento', [{
      codigo: "001",
      descricao: "À vista"
    }, {
      codigo: "002",
      descricao: "Boleto 7 Dias"
    }])

    return queryInterface.bulkInsert('Clientes', [{
      nome: "João da Silva",
      nomeFantasia: "Bar do João",
      logradouro: "Avenida Boituva 1010",
      uf: "SP"
    }])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
