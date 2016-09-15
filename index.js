var async = require('async')

module.exports = function transaction (client, queries, callback) {
  client.query('BEGIN', function (err) {
    if (err) return callback(err)

    async.parallel(queries, function (err) {
      if (err) {
        return client.query('ROLLBACK', (err2) => {
          // preference ROLLBACK error
          // TODO: combine error?
          callback(err2 || err)
        })
      }

      client.query('COMMIT', callback)
    })
  })
}
