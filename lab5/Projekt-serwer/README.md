# WDAI Restaurant Backend

## Before you start

Create a file `config.env` containing the following code:

	NODE_ENV=development
	PORT=3000
	DATABASE=<YOUR_CONNECTION_STRING>
	DATABASE_PASSWORD=<PASSWORD>

After creating a file, do the following steps:
- Replace `<YOUR_CONNECTION_STRING>` with your MongoDB connection string (connection with password),
- Replace `<PASSWORD>` with your password,
- In `<YOUR_CONNECTION_STRING>` write `<PASSWORD>` in a part of a url where you should provide your password (without replacing `<PASSWORD>` string with your password)

## Development server

Run `npm run watch` to start a server in a development mode.

## Deployment server

Run `npm start` command to start a server in a deployment mode.