module.exports = function transaction (client, fn, callback) {
  client.query('BEGIN', function (err) {
    if (err) return callback(err)

    fn(function (err, result) {
      if (err) {
        client.query('ROLLBACK', (err2) => {
          // preference ROLLBACK error
          callback(err2 || err)
        })

        return
      }

      client.query('COMMIT', function () {
        callback(null, result)
      })
    })
  })
}
