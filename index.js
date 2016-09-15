var async = require('async')

module.exports = function group (client, queries, callback) {
  client.query('BEGIN', function (err) {
    if (err) return callback(err)

    async.parallel(queries, function (err) {
      if (err) {
        return client.query('ROLLBACK', (err2) => {
          // pass through error to next
          callback(err2 || err)
        })
      }

      client.query('COMMIT', callback)
    })
  })
}
