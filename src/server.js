const Hapi = require('@hapi/hapi');
const routes = require('./routes/books');

const start = async () => {
  const config = {
    port: 9000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  };
  
  const server = Hapi.server(config);
  server.route(routes);
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

start();