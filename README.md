# pg-async-transaction
Trivially wraps `BEGIN` and `COMMIT` to provide behind-the-scenes transaction support for your POSTGRES queries.

If `callback(err)` happens,  the wrapper calls `ROLLBACK` and upon success returns the `err` object.

If `ROLLBACK` errors, preference is given to the `ROLLBACK` error in the spot of `err`.


## Example
``` js
const pg = require('pg')
const pat = require('pg-async-transaction')
const parallel = require('run-parallel')

function foo (done) {
  pg.connect(process.env.POSTGRES, (err, client, free) => {
    if (err) return done(err)

    pat(client, (callback) => {
      parallel([
        (next) => client.query('INSERT ...', next),
        (next) => client.query('INSERT ...', next),
        (next) => client.query('INSERT ...', next)
      ], callback)
    }, (err, results) => {
      if (err) free()

      free()
      done(err)
    })
  })
}

// ...
```

## LICENSE [MIT](LICENSE)
