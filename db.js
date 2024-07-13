// db.js
const knex = require('knex');
const config = require('./knexfile');

const db = knex(config.development);

// Criação da tabela
db.schema.hasTable('items').then(exists => {
  if (!exists) {
    return db.schema.createTable('items', table => {
      table.increments('id').primary();
      table.string('name');
      table.string('description');
    });
  }
});

module.exports = db;
