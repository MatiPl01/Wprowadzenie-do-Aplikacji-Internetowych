# WDAI Restaurant Backend

## Before you start

Create a file `config.env` in a root directory. A file should contain following declarations:

    NODE_ENV=development // or deployment
    PORT=3000
    DATABASE=<DATABASE_CONNECTION_STRING>
    DATABASE_PASSWORD=<DATABASE_PASSWORD>

`<DATABASE_CONNECTION_STRING>` should containing a url used to setup a connection to the MongoDB database.

Provided connection url should be formatted as follows:
mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER_NAME>.ujdvy.mongodb.net/<DATABASE_NAME>?retryWrites=true&w=majority

You should replace `<USERNAME>` with created MongoDB user name, `<CLUSTER_NAME>` with a name of the cluster where a database is stored, `<DATABASE_NAME>` with a name of the database.

Sample connection string:


## Development server

Run `npm run watch` to start a server in a development mode.

## Deployment server

Run `npm start` command to start a server in a deployment mode.

