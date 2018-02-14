
exports.up = function(knex, Promise) {
  return knex.schema.createTable('access_codes', function(table) {
    table.increments('id').primary();
    table.string('code');
    table.date('start_date');
    table.date('end_date');
    table.boolean('expired').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('access_codes');
  
};
