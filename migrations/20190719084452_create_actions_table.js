exports.up = function(knex) {
  return knex.schema.createTable("actions", tbl => {
    tbl.increments();
    tbl.text("action_description", 128)
      .unique()
      .notNullable();
    tbl.text("action_notes", 128);   
    tbl.boolean("action_completed", 128);
    tbl.integer("project_id")
      .unsigned()
      .notNullable()
      .references("id") 
      .inTable("projects")
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('actions')
};
