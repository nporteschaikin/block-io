module.exports = (function (app) {

  require('./auth')(app);
  require('./cities')(app);

});
