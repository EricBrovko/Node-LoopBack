'use strict';

const controller = require('../../common/controllers/main');

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  // router.get('/', server.loopback.status());
  router.get('/initialData.xlsx', controller.initialData);


  server.use(router);
};
