# pg-async-transaction
Asynchronously run node-postgres queries in a postgres transaction, rolling back on error.

## Example

``` js
let pg = require('pg')
let pat = require('pg-async-transaction')
let parallel = require('run-parallel')

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

			// results (if any) from parallel
			console.log(results)

			free()
			done(err)
		})
	})
}

// ...
```

## LICENSE [MIT](LICENSE)
