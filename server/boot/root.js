'use strict';

const controller = require('../../common/controllers/main');

module.exports = function(server) {
  const router = server.loopback.Router();

  router.get('/initialData.xlsx', controller.initialData);

  server.use(router);
};
