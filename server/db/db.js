const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const dbName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')
const dbUrl = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
let db

if (process.env.NODE_ENV === 'development') {
  db = new Sequelize(dbUrl, {
    logging: false
  })
} else {
  db = new Sequelize(dbUrl, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: true
    }
  })
}

module.exports = db

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}
