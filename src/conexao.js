const knex = require("knex")({
  client: "pg",
  connection: {
    user: "rfkvvvancxunxm",

    host: "ec2-34-201-95-176.compute-1.amazonaws.com",

    database: "d38vovk5crh3ha",

    password:
      "6f51a146c960b8a368e0b6c65e9fd49cc35104e09721b33838e5dc11b645f372",

    port: 5432,

    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = knex;
