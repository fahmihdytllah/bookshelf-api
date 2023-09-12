/**
 * Instagram : @fahmihdytllah
 * Visit me  : linktr.ee/jagocode
 */
 
const Hapi = require('@hapi/hapi');
const routes = require('./routes/books');

const config = {
  port: 9000,
  host: 'localhost',
  routes: {
    cors: {
      origin: ['*'],
    }
  }
};

const start = async () => {
  const server = Hapi.server(config);
  server.route(routes);
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

start();