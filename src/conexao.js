const knex = require("knex")({
  client: "pg",
  connection: {
    host: "ec2-52-3-2-245.compute-1.amazonaws.com",
    port: 5432,
    user: "rharogcjviiuel",
    password:
      "421f181b05f131947b8d3d4e56dc9510281087c5f15bf2390cee568a02e53cee",
    database: "dfovdoojrb0lle",
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = knex;
