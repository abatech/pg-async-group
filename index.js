module.exports = function transaction (client, fn, callback) {
  client.query('BEGIN', function (err) {
    if (err) return callback(err)

    fn(function (err) {
      if (!err) return client.query('COMMIT', callback)

      client.query('ROLLBACK', (err2) => {
        // preference ROLLBACK error
        // TODO: combine error?
        callback(err2 || err)
      })
    })
  })
}
