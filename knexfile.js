var env = process.env.NODE_ENV || 'development'

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.homeAutoHost,// 'localhost',
      database: process.env.homeAutoDB,// 'giby_rubber',
      user: process.env.homeAutoUser,// 'dantest',
      password: process.env.homeAutoPass // 'mypass'
    },
    pool: {
      min: 2,
      max: 8
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations/'
    }
  },

  production: {
    client: 'pg',
    connection: {
      host: process.env.homeAutoHost,// 'localhost',
      database: process.env.homeAutoDB,// 'giby_rubber',
      user: process.env.homeAutoUser,// 'dantest',
      password: process.env.homeAutoPass // 'mypass'
    },
    pool: {
      max: 4
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations/'
    }
  }
};
