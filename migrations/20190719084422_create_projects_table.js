
exports.up = function(knex) {
  return knex.schema.createTable("projects", tbl => {
    tbl.increments();
    tbl.text("project_name", 128)
      .unique()
      .notNullable();
    tbl.text("project_description", 128)    
    tbl.boolean("project_completed", 128)    
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('projects')
};
