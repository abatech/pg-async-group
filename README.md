# pg-async-transaction
Asynchronously run node-postgres queries in a postgres transaction, rolling back on error.

## Example

``` js
let pg = require('pg')
let pat = require('pg-async-transaction')
let parallel = require('run-parallel')

pg.connect(process.env.POSTGRES, (err, client, free) => {
	if (err) return done(err)

	pat(client, (callback) => {
		parallel([
			(callback) => client.query('INSERT ...', callback),
			(callback) => client.query('INSERT ...', callback),
			(callback) => client.query('INSERT ...', callback)
		], callback)
	}, (err, results) => {
		if (err) free()

		// results (if any) from parallel
		console.log(results)

		done(err)
	})
})
```

## LICENSE [ISC](LICENSE)
