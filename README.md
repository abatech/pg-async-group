# pg-async-transaction
Asynchronously run node-postgres queries in a postgres transaction, rolling back on error.

## Example

``` js
let pg = require('pg')
let pat = require('pg-async-transaction')

pg.connect(process.env.POSTGRES, (err, client, free) => {
	if (err) return callback(err)

	pat([
		(callback) => client.query('INSERT ...', callback),
		(callback) => client.query('INSERT ...', callback),
		(callback) => client.query('INSERT ...', callback)
	], queries, (err) => {
		free()

		callback(err)
	})
})
```

## LICENSE [ISC](LICENSE)
